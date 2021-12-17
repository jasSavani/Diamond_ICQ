#Generate signed apk for android

#Steps to follow before running this script
#==========================================
# 1. Make sure all paths and version and build nos are properly replaced with your project paths and version no
# 2. Make a folder named playstore in project directory
# 3. Generate keystore for your project by running
#    keytool -genkey -v -keystore yourappname.keystore -alias appnamealias -keyalg RSA -keysize 2048 -validity 10000
#    keytool -genkey -v -keystore icq.keystore -alias icq -keyalg RSA -keysize 2048 -validity 10000
#    refer this link for questions to be filled while generating keystore
#    http://base.techority.com/2013/01/01/how-to-generate-a-key-for-your-android-app-on-a-mac/
# 4. Paste that .keystore file in playstore/keystore folder (keystore file provided will be used to generate signed apk)
# 5. Run this script by running this command from directory where shell script is located
#    sh F:/ionic/App/ICQ/Detail/generate_apk.sh
# /Users/macbookpro/Desktop
# C:\ProgramData\Oracle\Java\javapath;C:\Program Files (x86)\Intel\iCLS Client\;C:\Program Files\Intel\iCLS Client\;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files (x86)\Intel\OpenCL SDK\2.0\bin\x86;C:\Program Files (x86)\Intel\OpenCL SDK\2.0\bin\x64;%USERPROFILE%\.dnx\bin;C:\Program Files\Microsoft DNX\Dnvm\;C:\Program Files\Microsoft SQL Server\130\Tools\Binn\;C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\110\Tools\Binn\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\Binn\;C:\Program Files\Microsoft SQL Server\120\Tools\Binn\;C:\Program Files\Microsoft SQL Server\120\DTS\Binn\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\Binn\ManagementStudio\;C:\Program Files (x86)\Microsoft SQL Server\120\DTS\Binn\;C:\Program Files\nodejs\;C:\Program Files\Microsoft VS Code\bin;F:\ionic\gradle-4.6\bin;F:\ionic\sdk\platform-tools;C:\Program Files\Java\jdk1.8.0_161\bin;F:\wamp\bin\php\php7.2.4\

#C:\Program Files (x86)\Common Files\Oracle\Java\javapath;C:\ProgramData\Oracle\Java\javapath;C:\Program Files (x86)\Intel\iCLS Client\;C:\Program Files\Intel\iCLS Client\;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files (x86)\Intel\OpenCL SDK\2.0\bin\x86;C:\Program Files (x86)\Intel\OpenCL SDK\2.0\bin\x64;%USERPROFILE%\.dnx\bin;C:\Program Files\Microsoft DNX\Dnvm\;C:\Program Files\Microsoft SQL Server\130\Tools\Binn\;C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\110\Tools\Binn\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\Binn\;C:\Program Files\Microsoft SQL Server\120\Tools\Binn\;C:\Program Files\Microsoft SQL Server\120\DTS\Binn\;C:\Program Files (x86)\Microsoft SQL Server\120\Tools\Binn\ManagementStudio\;C:\Program Files (x86)\Microsoft SQL Server\120\DTS\Binn\;C:\Program Files\nodejs\;C:\Program Files\Microsoft VS Code\bin;F:\ionic\gradle-4.6\bin;F:\ionic\sdk\platform-tools;C:\Program Files\Java\jdk1.8.0_191\bin;F:\wamp\bin\php\php7.2.4\
# if pc change for upload build then change following :
# 1. versionNo if version chnaged
# 2. buildNo if chnaged
# 3. projectFolderPath
# 4. latestBuildToolPath

versionNo='1.1.1'
buildNo='1'
projectName='icq'
projectFolderPath='F:/ionic/App/ICQ'
signedApkName=$projectName'-signed.apk'
unsignedApkName='app-release-unsigned.apk'

playstoreFolderPath=$projectFolderPath'/playstore/'
folderName=$versionNo-$buildNo
buildVersionFolderPath=$playstoreFolderPath$folderName
keyStorePath=$playstoreFolderPath'/keystore/icq.keystore'
unsignedApkPath=$projectFolderPath'/platforms/android/app/build/outputs/apk/release/'$unsignedApkName
latestBuildToolPath='F:/ionic/sdk/build-tools/26.0.2'

cd $projectFolderPath
#ionic cordova build android --prod --release
cd $playstoreFolderPath
mkdir $folderName
cp $unsignedApkPath $buildVersionFolderPath
cp $keyStorePath $buildVersionFolderPath
cd $folderName
echo $PWD
jarsigner -verbose -tsa http://timestamp.digicert.com -sigalg SHA1withRSA -digestalg SHA1 -keystore icq.keystore $unsignedApkName icq
mv $unsignedApkName $latestBuildToolPath
cd $latestBuildToolPath
./zipalign -v 4 $unsignedApkName $signedApkName
mv $latestBuildToolPath/$unsignedApkName $buildVersionFolderPath
mv $latestBuildToolPath/$signedApkName $buildVersionFolderPath
echo '.'
echo '.'
echo '.'
echo '.'
echo '.'
echo '.'
echo '.'
echo '.'
echo '.'
echo '.'
echo 'Successfully created signed Apk, cheers! :)'

