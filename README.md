# Reposi3
A Cydia repository template. This template contains sample on how you can easily make depiction pages without replicating your html pages. The pages are styled using [Bootsrap](http://getbootstrap.com/) which is really easy to use. You can see how it looks like by visiting [this sample repo](https://supermamon.github.io/Reposi3/) on your desktop or mobile phone.

Most data for this repo is stored on XML files and are loaded on the depiction page dynamically. See the guide below on how to set it up. Note that this guide doesn't cover creating .deb files but will briefly cover assiging depictions.

## How to install this template

### 1. Download
The latest release will always be [here](https://github.com/supermamon/Reposi3/archive/master.zip).

### 2. Extract
Extract the contents into a subfolder on your website. If you're using [Github Pages](https://pages.github.com/), it should be under `username.github.io/repo`. You can change `repo` to anything you want like `cydia` for example. So your repo url would be `https://username.github.io/cydia`. For this guide we'll assume that you are using github your repo url is `https://username.github.io/repo`.

#### 3. Personalize
Edit `Release` file. Modify the items pointed by `<--`
    
    Origin: Reposi3  <-- 
    Label: Reposi3   <--
    Suite: stable
    Version: 1.0
    Codename: ios
    Architectures: iphoneos-arm
    Components: main
    Description: Reposi3 - a cydia repo template  <--

#### 4. Your repo is ready.
At this point your repo is basically ready to be added into Cydia. You can also visit your repo's homepage by going to `https://username.github.io/repo/`. It will come with 2 sample packages, Old Package and New Package. Each of the packages have a link on this page pointing to their depictions. Next guide will show you how to assign and customize your depiction pages.


## Depiction pages for your packages

#### 1. A basic depiction page
Let's start with a simple one. First, of course, add your `.deb` files into the `debs` folder. Then, inside the `depictions` folder, duplicate the folder `com.supermamon.oldpackage`. You will see 2 xml files -- `info.xml` and `changelog.xml`. Edit the 2 files and put in the information regarding you package. The tags are pretty much self-explanatory. Contact [@reposi3](https://twitter.com/reposi3) or [@supermamon](https://twitter.com/supermamon) for questions.

`info.xml`. 
```xml
<package>
	<id>com.supermamon.oldpackage</id>
	<name>Old Package</name>
	<version>1.0.0-1</version>
	<compatibility>
		<firmware>
		    <miniOS>5.0</miniOS>
			<maxiOS>7.0</maxiOS>
			<otherVersions>unsupported</otherVersions>
			<!--
			for otherVersions, you can put either unsupported or unconfirmed
			-->
		</firmware>
	</compatibility>
	<dependencies></dependencies>
	<descriptionlist>
		<description>This is an old package. Requires iOS 7 and below..</description>
	</descriptionlist>
	<screenshots></screenshots>
	<changelog>
		<change>Initial release</change>
	</changelog>
	<links></links>
</package>
```
Edit `changelog.xml`.
```xml
<changelog>
	<changes>
		<version>1.0.0-1</version>
		<change>Initial release</change>
	</changes>
</changelog>
```

#### 2. Edit the depiction footer data
This data are the links that appear at the bottom of every depication. The data is stored in `repo.xml` at the root folder of your repo.

```xml
<repo>
	<footerlinks>
		<link>
			<name>Follow me on Twitter</name>
			<url>https://twitter.com/reposi3</url>
			<iconclass>glyphicon glyphicon-user</iconclass>
		</link>
		<link>
			<name>I want this depiction template</name>
			<url>https://github.com/supermamon/Reposi3</url>
			<iconclass>glyphicon glyphicon-thumbs-up</iconclass>
		</link>
	</footerlinks>
</repo>
```

#### 3. Link the depiction page to your Packages file.
Your depiction like should look like this:
```text
Depiction: https://username.github.io/repo/depictions/?p=[idhere]
```
Replace `[idhere]` with your actual package id.
```text
Depiction: https://username.github.io/repo/depictions/?p=com.supermamon.oldpackage
```
#### 4. Almost there
Compress your Packages file to bzip2 and there you have it! In case you haven't done yet, add your repo `https://username.github.io/repo/` to cydia. One final touch is to update `index.html`. Look at line 18 and 19. Change line 18 into your own **brand** and line 19 to have your own URL. Line2 27-44 contains the list of packages. You can edit those too.
```html
16 <div class="container">
17 	<div class="well">
18 		<p><span class="text-primary"><b>Reposi3</span></b> is a Cydia repository template.</p>
19 		<a class="btn btn-sm btn-default" href="cydia://url/https://cydia.saurik.com/api/share#?source=https://supermamon.github.io/Reposi3/">Add to Cydia</a>
20 	</div>
21 </div>
```

#### 5. ALL DONE!
**And there you have it! Your first package on your repo!**

## What Next?
If you want to put more information on your depictions, see the other sample in `\depictions\com.supermamon.newpackage\`. This sample contains all the information that is supported.

Also, this guide is mostly a work in progress. I'll add up more details soon -- screenshots, more samples, repo icon, etc. If you have any questions, contact [@reposi3](https://twitter.com/reposi3) or [@supermamon](https://twitter.com/supermamon).