# Stage 1: Build the React.js project
FROM node:14 AS frontend-build
WORKDIR /src
COPY src/NRS.BFF/Frontend/package*.json ./
RUN npm install
COPY src/NRS.BFF/Frontend ./
RUN npm run build
RUN pwd

# Stage 2: Build and publish the .NET solution
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /src
COPY src .
RUN dotnet restore NRS.BFF/NRS.BFF.csproj
RUN dotnet publish NRS.BFF/NRS.BFF.csproj -c Release -o /app/publish

# Stage 3: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=dotnet-build /app/publish .
RUN ls /src/build 
RUN ls /src 
COPY --from=frontend-build /src/build ./wwwroot/Frontend 
EXPOSE 80
ENTRYPOINT ["dotnet", "NRS.BFF.dll"]
