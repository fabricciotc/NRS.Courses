# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Stage 1: Build the React.js project
FROM node:14 AS frontend-build
WORKDIR /src
COPY src/NRS.BFF/Frontend/package*.json ./
RUN npm install
COPY src/NRS.BFF/Frontend ./
RUN npm run build

# Stage 2: Build the C# solution
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /src
COPY src/NRS.BFF/NRS.BFF.csproj NRS.BFF/
COPY src/NRS.Aplicacion/NRS.Aplicacion.csproj NRS.Aplicacion/
COPY src/NRS.Persistencia/NRS.Persistencia.csproj NRS.Persistencia/
COPY src/NRS.Dominio/NRS.Dominio.csproj NRS.Dominio/
COPY src/NRS.Seguridad/NRS.Seguridad.csproj NRS.Seguridad/
RUN dotnet restore "NRS.BFF/NRS.BFF.csproj"
COPY src/NRS.BFF .
WORKDIR "/src/NRS.BFF"
RUN dotnet build "NRS.BFF.csproj" -c Release -o /app/build

# Stage 3: Publish the .NET solution
FROM dotnet-build AS dotnet-publish
RUN dotnet publish "NRS.BFF.csproj" -c Release -o /app/publish

# Stage 4: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=dotnet-publish /app/publish .
COPY --from=frontend-build /src/NRS.BFF/Frontend/build ./wwwroot/Frontend
EXPOSE 80
ENTRYPOINT ["dotnet", "NRS.BFF.dll"]