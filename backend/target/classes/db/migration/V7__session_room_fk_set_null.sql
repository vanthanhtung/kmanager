ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_room_id_fkey;
ALTER TABLE sessions ADD CONSTRAINT sessions_room_id_fkey FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL;
