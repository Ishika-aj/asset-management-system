-- Insert default admin user
INSERT INTO users (id, full_name, username, password)
VALUES (1, 'Admin User', 'admin', 'admin123')
ON CONFLICT DO NOTHING;

-- Insert some sample assets
INSERT INTO assets (id, asset_id, name, category, status, current_user_id)
VALUES 
(1, 'A001', 'Laptop Dell XPS', 'Electronics', 'Available', NULL),
(2, 'A002', 'Office Chair', 'Furniture', 'In Use', 1),
(3, 'A003', 'Monitor HP 24"', 'Electronics', 'In Maintenance', NULL)
ON CONFLICT DO NOTHING;
