instructions = [
    """
    CREATE TABLE IF NOT EXISTS user (
        user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        username TEXT NOT NULL,
        user_password TEXT NOT NULL,
        user_birth TEXT NOT NULL,
        user_email TEXT NOT NULL,
        user_fullname TEXT NOT NULL,
        user_genre TEXT NOT NULL,
        user_type INT NOT NULL,
        user_status INT NOT NULL,
        user_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    """
]