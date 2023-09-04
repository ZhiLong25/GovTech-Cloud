-- Create the user with the desired username and password
CREATE USER admin IDENTIFIED BY 'admin123';

-- Create the 'healthrecords' schema
CREATE SCHEMA healthrecords;

-- Grant all privileges on the 'healthrecords' schema to the user
GRANT ALL PRIVILEGES ON healthrecords.* TO admin;
