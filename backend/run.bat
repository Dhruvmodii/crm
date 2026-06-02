@echo off
echo =======================================================================
echo              Softone ERP Flask Backend Runner (XAMPP MySQL)
echo =======================================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not added to your PATH.
    echo Please install Python from https://www.python.org/downloads/
    echo and make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)

:: Create virtual environment if it doesn't exist
if not exist venv (
    echo [INFO] Creating Python virtual environment (venv)...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create virtual environment.
        pause
        exit /b 1
    )
    echo [SUCCESS] Virtual environment created.
    echo.
)

:: Activate virtual environment and install requirements
echo [INFO] Activating virtual environment...
call venv\Scripts\activate

echo [INFO] Installing/updating dependencies from requirements.txt...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully.
echo.

echo [INFO] Starting Flask Server...
echo.
echo =======================================================================
echo IMPORTANT: Please make sure XAMPP Control Panel is open and MySQL is
echo running on port 3306 before starting the Flask server.
echo =======================================================================
echo.

python app.py

pause
