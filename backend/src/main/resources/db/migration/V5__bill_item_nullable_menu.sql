ALTER TABLE bill_items DROP CONSTRAINT IF EXISTS bill_items_menu_item_id_fkey;
ALTER TABLE bill_items ALTER COLUMN menu_item_id DROP NOT NULL;
