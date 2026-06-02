-- Seed default menu categories for all existing venues
DO $$
DECLARE
    v RECORD;
BEGIN
    FOR v IN SELECT id FROM venues LOOP
        INSERT INTO menu_categories (venue_id, name_en, name_vi, sort_order) VALUES
            (v.id, 'Food', 'Món ăn', 1),
            (v.id, 'Drink', 'Đồ uống', 2),
            (v.id, 'Other', 'Khác', 3)
        ON CONFLICT DO NOTHING;
    END LOOP;
END $$;
