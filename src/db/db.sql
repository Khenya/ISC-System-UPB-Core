-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    mothername VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Permissions Table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- User_Roles Table (Many-to-Many relationship between users and roles)
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Role_Permissions Table (Many-to-Many relationship between roles and permissions)
CREATE TABLE role_permissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);


CREATE TABLE Modalities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Graduation_Process (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    modality_id INT REFERENCES Modalities(id),
    project_name VARCHAR(255),
    seminar_enrollment BOOLEAN,
    date_seminar_enrollment TIMESTAMP,
    period VARCHAR(255),
    tutor_letter BOOLEAN,
    tutor_id INTEGER,
    tutor_approval BOOLEAN,
    reviewer_letter BOOLEAN,
    reviewer_id INTEGER,
    reviewer_approval BOOLEAN,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (tutor_id) REFERENCES users(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

CREATE TABLE Directed_Work_Specifics (
    graduation_process_id INT REFERENCES Graduation_Process(id),
    company_letter BOOLEAN,
    company_approval BOOLEAN
);


INSERT INTO Modalities (name) VALUES 
('Proyecto de Grado'),
('Trabajo Dirigido'),
('Tesis');
