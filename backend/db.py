import os
import pymysql
from pymysql.cursors import DictCursor
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "softone_erp")

def get_db_connection(include_db=True):
    """
    Establishes a connection to the MySQL database.
    If include_db is False, connects to the MySQL server without selecting a database
    (useful during database creation/initialization).
    """
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME if include_db else None,
        cursorclass=DictCursor,
        charset="utf8mb4",
        autocommit=True
    )

def init_db():
    """
    Initializes the database by creating it if it doesn't exist,
    and executing the schema.sql file to create tables and insert seed data.
    """
    print("Initializing database...")
    try:
        # Step 1: Connect to MySQL server without database to create the DB if it doesn't exist
        conn = get_db_connection(include_db=False)
        with conn.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        conn.close()
        print(f"Database '{DB_NAME}' verified/created.")

        # Step 2: Connect to the database and run schema.sql
        conn = get_db_connection(include_db=True)
        schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
        
        if os.path.exists(schema_path):
            with open(schema_path, "r", encoding="utf-8") as f:
                schema_sql = f.read()
            
            # Split SQL statements by semicolon (ignoring semicolons inside comments/strings is hard,
            # but for a standard schema file, splitting by semicolon works if we filter empty ones)
            # PyMySQL execute() only runs one statement at a time.
            statements = schema_sql.split(";")
            with conn.cursor() as cursor:
                for statement in statements:
                    statement = statement.strip()
                    if not statement or statement.startswith("--"):
                        continue
                    try:
                        cursor.execute(statement)
                    except Exception as e:
                        # Ignore duplicate key errors on seed data or print warning
                        if "Duplicate entry" in str(e):
                            continue
                        print(f"Error executing statement: {statement[:50]}... Error: {e}")
            print("Schema imported successfully!")
        else:
            print("schema.sql not found. Skipping table creation.")
        
        conn.close()
        print("Database initialization complete.")
        return True
    except Exception as e:
        print(f"Database initialization failed: {e}")
        print("Please ensure XAMPP MySQL is running on localhost:3306.")
        return False

def execute_query(query, params=None, fetch_all=True, fetch_one=False):
    """
    Helper function to execute a SQL query safely and return results.
    """
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(query, params or ())
            if fetch_one:
                return cursor.fetchone()
            if fetch_all:
                return cursor.fetchall()
            return cursor.rowcount
    finally:
        conn.close()
