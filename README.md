
[在线 demo](http://139.196.177.74:5000/)

[源码](https://github.com/sunshine4Cpic/OneBlock)

chromeDriver示例 源码 在win7版本下的 chromeBlock.rar

[chromeDriver示例 源码](https://github.com/sunshine4Cpic/chromeBlock)


## Windows 7(x64) / Windows Server 2008 R2(x64)
##### 1. 安装Visual C++ 运行库 
下载 vc_redist.x64.exe 并安装

##### 2. 运行OneBlock
下载win7-x64版本,运行oneBlockWeb.exe文件

## Windows 10
##### 1. 运行OneBlock
下载win10-x64版本,运行oneBlockWeb.exe文件

## Linxu CentOS 7(x64)
##### 1. 安装C运行库(CentOS.7 minimal 版本需要安装)
```
sudo yum install libunwind libicu
```

##### 2. 运行OneBlock
下载centos.7-x64版本,赋权并运行:
```
chmod 766 oneBlockWeb
./oneBlockWeb
```

## OS X 10.10
##### 1. 安装homeBrew
```
curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1
```

##### 2. 安装openssl
```
brew install openssl
ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/
```

##### 3. 运行OneBlock
下载osx.10.10-x64版本,赋权并运行:
```
chmod 766 oneBlockWeb
./oneBlockWeb
```
## OS X 10.11
##### 1. 安装homeBrew
```
curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1
```

##### 2. 安装openssl
```
brew install openssl
ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/
```

##### 3. 运行OneBlock
下载osx.10.11-x64版本,赋权并运行:
```
chmod 766 oneBlockWeb
./oneBlockWeb
```