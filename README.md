# Reposi3
This is Cydia repository template. This template contains samples on how you can easily make depiction pages without replicating your html pages. The pages are styled using [Bootsrap](http://getbootstrap.com/) which is really easy to use. You can see how it looks like by visiting [this sample repo](https://supermamon.github.io/Reposi3/) on your desktop or mobile phone.

Data for this repo is stored on JSON files (XML for previous version) and are loaded on the depiction page dynamically. See the guide below on how to set it up. Note that this guide doesn't cover creating .deb files but will briefly cover assigning depictions.

If you are looking for the XML-based version of project, you can download it [here](https://github.com/supermamon/Reposi3/archive/v15.07.zip). [Readme](https://github.com/supermamon/Reposi3/blob/v15.07/README.md).

## How to use this template

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

Edit `repo-info.json`.

```javascript
{
  "name"        : "Reposi3",
  "repo-url"    : "https://supermamon.github.io/Reposi3/",
  "maintainer"  : "@supermamon",
  "footerlinks" : [
    {
      "name"  : "Follow me on Twitter",
      "url"   : "https://twitter.com//reposi3",
      "icon"  : "glyphicon glyphicon-user"
    },
    {
      "name"  : "I want this depiction template",
      "url"   : "https://github.com/supermamon//Reposi3",
      "icon"  : "glyphicon glyphicon-thumbs-up"
    }
  ]
}
```

#### 4. Your repo is ready.
At this point your repo is basically ready to be added into Cydia. You can also visit your repo's homepage by going to `https://username.github.io/repo/`. It will come with 2 sample packages, Old Package and New Package. Each of the packages have a link on this page pointing to their depictions. Next guide will show you how to add your own depiction pages.

## Depiction pages for your packages

#### 1. Add a link to the depiction page on your control file
Add a line on you `control` file like this
```text
Depiction: https://username.github.io/repo/depictions/?p=[idhere]
```
where `[idhere]` with your actual package id. Example:
```text
Depiction: https://username.github.io/repo/depictions/?p=com.supermamon.oldpackage
```
Now, compile your project and save the `.deb` into the `repo/debs/` folder. Open a terminal in the `repo` folder and run these commands.
```
dpkg-scanpackages -m ./debs/ /dev/null >Packages
bzip2 Packages
```

#### 2. Create your depiction page
Let's start with a simple one.   
Inside the `depictions` folder, duplicate the folder `com.supermamon.oldpackage`. You will see a file name `package-info.json`. Edit the file and put in the information regarding your package. See the **Keys** section below for detailed description of the keys.

`package-info.json`.
```javascript
{
  "id"            : "com.supermamon.oldpackage",
  "packagename"   : "Old Package",
  "author"        : "@supermamon",
  "compatibility" : {
    "firmware"    : {
      "miniOS"    : "6.0",
      "maxiOS"    : "7.0",
      "otherVersions" : "unsupported"
    }
  },
  "descriptions"  : [
    "This is an old package. Requires iOS 7 and below."
  ],
  "changelog"     : {
    "1.0.0" : [
                "Initial Release"
              ]
  }
}
```
#### 3. (Optional) Package List on index page.
This [homepage](https://supermamon.github.io/Reposi3/) of this template holds a list of packages that it stores. This page is not visible in cydia but can be browsed via a mobile or desktop browser. To add your new package in the list, edit `pkg-list.json` and add you package id.

`pkg-list.json`.
```javascript
{
  "packages" : [
    "com.supermamon.newpackage",
    "com.supermamon.oldpackage"
  ]
}
```

#### 4. ALL DONE!
**And there you have it! Your first package on your repo!**

## What Next?
You will of course want to put more information on your repo like screenshots, dependencies or more change logs. To do that, see the other sample in `\depictions\com.supermamon.newpackage\`.

## Keys

* `id` : package id or bundle id
* `packagename` : The name of the package
* `author` : Who made the package
* `compatibility`
  * `firmware`
    * `minIOS` : (Optional, Default 1.0.0) The minimum firmware version supported
    * `maxIOS` : (Optional) The latest firmware version supported
    * `otherVersions` : (unsupported|unconfirmed). `unsupported` means it cannot be used with other firmware versions beside the ones indicated on `minIOS` and `maxIOS`. `unconfirmed` means it's untested on other versions.
* `dependencies` : An array of packages ids which this packages depend on required.
* `descriptions` : An array of sentences that describes the package
* `changelog` : This is a dictionary where each key is the version number. Changes for this version should be listed as an array of strings.
* `screenshots` : Same format as the change log. But for each screenshot, it should be listed as `{"image":"filename.png","description":"whatever"}`. Screenshot images should be stored in the `repo/depictions/packageid/screenshots/' folder.

## Help
If you have any questions, contact [@reposi3](https://twitter.com/reposi3) or [@supermamon](https://twitter.com/supermamon).
