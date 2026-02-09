-- Create subscribers table for waitlist
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    source_page VARCHAR(255),
    traffic_source VARCHAR(255),
    referer_url TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    landing_page TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Backfill columns if the table already exists
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS traffic_source VARCHAR(255);
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS referer_url TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255);
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255);
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255);
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS utm_term VARCHAR(255);
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS utm_content VARCHAR(255);
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS landing_page TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
