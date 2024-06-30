# NRS.Courses Deployment Guide

Welcome to the NRS.Courses repository! 🎉 This guide will help you deploy the application using Docker and .NET.

## Prerequisites 🛠️

- [.NET SDK](https://dotnet.microsoft.com/download) installed
- [Docker](https://www.docker.com/products/docker-desktop) installed

## Deployment Instructions 🚀

### Deploying with Docker 🐳

1. **Clone the Repository** 📂
    ```bash
    git clone https://github.com/fabricciotc/NRS.Courses.git
    cd NRS.Courses
    ```

2. **Build the Docker Image** 🏗️
    ```bash
    docker build -t nrs.courses .
    ```

3. **Run the Docker Container** ▶️
    ```bash
    docker run -d -p 8080:80 nrs.courses
    ```

4. **Access the Application** 🌐
    Open your browser and navigate to `http://localhost:8080`

### Deploying with .NET 🖥️

1. **Clone the Repository** 📂
    ```bash
    git clone https://github.com/fabricciotc/NRS.Courses.git
    cd NRS.Courses
    ```

2. **Restore Dependencies** 📦
    ```bash
    dotnet restore
    ```

3. **Build the Application** 🏗️
    ```bash
    dotnet build
    ```

4. **Run the Application** ▶️
    ```bash
    dotnet run
    ```

5. **Access the Application** 🌐
    Open your browser and navigate to `http://localhost:5000`

## GitHub Plugins and Features 🎨

- **Issues**: Track your work and report bugs [here](https://github.com/fabricciotc/NRS.Courses/issues).
- **Pull Requests**: Contribute by creating a pull request [here](https://github.com/fabricciotc/NRS.Courses/pulls).
- **Projects**: Organize your tasks with GitHub Projects [here](https://github.com/fabricciotc/NRS.Courses/projects).

Feel free to explore the code and contribute! If you encounter any issues, please open an issue or a pull request.

Happy coding! 💻✨

---
🔗 **Useful Links**
- [Official Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Docker Documentation](https://docs.docker.com/)
