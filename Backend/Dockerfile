FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY publish/ .

EXPOSE 5000

ENTRYPOINT ["dotnet","Mini-visualiseur DICOM web.dll"]