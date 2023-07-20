# Stage 1: Build the React.js frontend
FROM node:14 AS frontend-build
WORKDIR /src/NRS.BFF/Frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend ./
RUN npm run build

# Stage 2: Build and publish the .NET solution
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy and restore NuGet packages
COPY ["NRS.BFF/NRS.BFF.csproj", "NRS.BFF/"]
COPY ["NRS.Aplicacion/NRS.Aplicacion.csproj", "NRS.Aplicacion/"]
COPY ["NRS.Persistencia/NRS.Persistencia.csproj", "NRS.Persistencia/"]
COPY ["NRS.Dominio/NRS.Dominio.csproj", "NRS.Dominio/"]
COPY ["NRS.Seguridad/NRS.Seguridad.csproj", "NRS.Seguridad/"]
RUN dotnet restore "NRS.BFF/NRS.BFF.csproj"

# Copy the entire solution and build
COPY . .
WORKDIR "/src/NRS.BFF"
RUN dotnet build "NRS.BFF.csproj" -c Release -o /app/build

# Publish the .NET solution
FROM build AS publish
RUN dotnet publish "NRS.BFF.csproj" -c Release -o /app/publish

# Stage 3: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app

# Copy the published .NET solution
COPY --from=publish /app/publish .

# Copy the frontend build files to the appropriate location
COPY --from=frontend-build /src/NRS.BFF/Frontend/build ./wwwroot/Frontend

EXPOSE 80
ENTRYPOINT ["dotnet", "NRS.BFF.dll"]
