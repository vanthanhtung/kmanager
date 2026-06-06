#!/bin/sh
#
# pg_dump backup script for kmanager
# Usage: docker compose run --rm backup [host] [port] [user] [db]
# Defaults to: postgres 5432 kmanager kmanager
#
# Cron example (runs daily at 2 AM on VPS):
# 0 2 * * * cd /opt/kmanager && docker compose run --rm backup >> /var/log/kmanager-backup.log 2>&1

set -e

PGHOST=${1:-postgres}
PGPORT=${2:-5432}
PGUSER=${3:-kmanager}
PGDATABASE=${4:-kmanager}
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-7}

BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/kmanager_${TIMESTAMP}.sql.gz"

echo "[$(date)] Starting backup of $PGDATABASE@$PGHOST:$PGPORT ..."
pg_dump -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" \
    --no-owner --no-acl | gzip > "$BACKUP_FILE"

echo "[$(date)] Backup written: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"

if [ "$RETENTION_DAYS" -gt 0 ]; then
    echo "[$(date)] Cleaning backups older than $RETENTION_DAYS days..."
    find "$BACKUP_DIR" -name "kmanager_*.sql.gz" -mtime +"$RETENTION_DAYS" -delete -print
fi

echo "[$(date)] Backup complete."
