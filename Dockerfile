# Stage 1: Build the React.js project
FROM node:14 AS frontend-build
WORKDIR /src/NRS.BFF/Frontend
COPY src/NRS.BFF/Frontend/package*.json ./
RUN npm install
COPY src/NRS.BFF/Frontend ./
RUN npm run build

# Stage 2: Build and publish the .NET solution
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /src
COPY src .
RUN dotnet restore NRS.BFF/NRS.BFF.csproj
RUN dotnet publish NRS.BFF/NRS.BFF.csproj -c Release -o /src/publish

# Stage 3: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /src
COPY --from=dotnet-build /src/publish .
COPY --from=frontend-build /src/NRS.BFF/build ./wwwroot 
EXPOSE 80
ENTRYPOINT ["dotnet", "NRS.BFF.dll"]
