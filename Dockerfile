# Stage 1: Build and publish the .NET solution
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /src

# Install Node.js and npm to support Elm asset build
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install -g elm

COPY src .
RUN dotnet restore NRS.BFF/NRS.BFF.csproj
RUN dotnet publish NRS.BFF/NRS.BFF.csproj -c Release -o /app/publish

# Stage 2: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=dotnet-build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "NRS.BFF.dll"]
