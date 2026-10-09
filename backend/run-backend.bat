@echo off
echo ============================================================
echo   HomeLink Spring Boot Backend Launcher
echo ============================================================
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Java is not detected in your PATH.
    echo Please install Java 17+ or run:
    echo   winget install Microsoft.OpenJDK.17
    echo Then restart your terminal.
    pause
    exit /b 1
)

where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Maven not detected in PATH.
    echo You can install Maven via: winget install Apache.Maven
    pause
    exit /b 1
)

echo [*] Starting Spring Boot Backend on http://localhost:8080...
mvn spring-boot:run
