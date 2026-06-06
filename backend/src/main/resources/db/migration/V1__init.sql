CREATE TABLE super_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    address TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE venue_managers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_venue_manager_venue FOREIGN KEY (venue_id) REFERENCES venues(id)
);

CREATE TABLE room_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    hourly_rate BIGINT NOT NULL CHECK (hourly_rate > 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    room_number VARCHAR(10) NOT NULL,
    name_en VARCHAR(100),
    name_vi VARCHAR(100),
    category_id UUID REFERENCES room_categories(id) ON DELETE SET NULL,
    area VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'CLEANING', 'MAINTENANCE')),
    hourly_rate BIGINT NOT NULL CHECK (hourly_rate > 0),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_room_venue_number UNIQUE (venue_id, room_number)
);

CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    name_vi VARCHAR(200) NOT NULL,
    category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE RESTRICT,
    price BIGINT NOT NULL CHECK (price > 0),
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_menu_item_venue_code UNIQUE (venue_id, code)
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    customer_name VARCHAR(200) NOT NULL,
    customer_phone VARCHAR(20),
    hourly_rate BIGINT NOT NULL,
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED')),
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMP,
    created_by VARCHAR(50) NOT NULL
);

CREATE INDEX idx_sessions_venue_status ON sessions(venue_id, status);
CREATE INDEX idx_sessions_room ON sessions(room_id);

CREATE TABLE bill_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
    item_name_en VARCHAR(200) NOT NULL,
    item_name_vi VARCHAR(200) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bill_items_session ON bill_items(session_id);

CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL UNIQUE REFERENCES sessions(id) ON DELETE RESTRICT,
    bill_number VARCHAR(20) NOT NULL UNIQUE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    room_number VARCHAR(10) NOT NULL,
    customer_name VARCHAR(200) NOT NULL,
    customer_phone VARCHAR(20),
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP NOT NULL,
    duration_seconds BIGINT NOT NULL,
    hourly_rate BIGINT NOT NULL,
    room_charge BIGINT NOT NULL,
    item_subtotal BIGINT NOT NULL,
    discount BIGINT NOT NULL DEFAULT 0,
    grand_total BIGINT NOT NULL,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('CASH', 'TRANSFER', 'CARD')),
    amount_tendered BIGINT,
    change_due BIGINT,
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bills_venue_date ON bills(venue_id, created_at);

INSERT INTO super_admins (username, password_hash) VALUES
('tungvan', '$2a$10$1xvNPtC4Ff3WpIgG.Z8GbeLXDp1Pvkt4Sx3sE.jzar8WdwzSkw3eq');
