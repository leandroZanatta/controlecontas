@echo off
echo Selecione ADV
echo 1 - Nexus One
echo 2 - Nexus 6
set /P OPCAO=Insira numero ADV : 

if %OPCAO%==1 goto nexusOne
if %OPCAO%==2 goto nexusSeis

:nexusOne
emulator -avd Nexus_One_API_26

:nexusSeis
emulator -avd Nexus_6_API_26