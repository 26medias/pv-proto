# CLI Specs #

The CLI is the command line tool that is used by 3rd party developers to check, test and publish their themes and widgets to Pagevamp's app store.

## Setup ##
To install the CLI, developers simply use NPM, like most of the frameworks and SDK available nowadays.

    npm install pagevamp -g

On the first run only, the CLI would ask them to login.

Their developer account on apps.pagevamp.com would provide them with a developer Key and a developer Secret.

    > Developer Key? _______________
    > Developer Secret? _______________
    > You are now logged in. Welcome [name].

Those credentials are saved locally by the CLI, so that the user never have to login again unless he logs out (using the logout command)

## Commands ##

### Create ###
Using the CLI, developers can create a new project from a scaffold.
Everything is done from the command line.

**Creating a new theme**

    pagevamp create theme


**Creating a new widget**

    pagevamp create widget


**The CLI then asks**

    > Project name? _______________


A directory would be created, named as the camel case version of the project's name. example: "hello world" -> "./helloWorld".

The user then navigate to that directory (cd helloWorld), that will enable him to keep managing his project using the command line.


### Test ###
Developers need to be able to test their themes and widgets while they work on it.

I propose 2 ways for them to test.

#### Local test ####
The CLI would start a web server that would display a local version of the pagevamp engine, packed into the CLI.
It would comes pre-loaded with the current user project.

A browser window would be automatically opened, and the CLI would detect any change in the project's code, and trigger a page reload so that the user can see his changes in real time in the browser.

From the project's directory:

    pagevamp test


#### Online/beta test ####

Developers should have the ability to test their themes and widgets on their online pagevamp account, and make it available to a selected group of people (beta testers, ...)

In order to do that, the theme/widget would be pushed to the app-store but only visible to its developers and that selected group of users, who would be able to install and test it, before submitting for validation by the Pagevamp team.

From the project's directory:

    pagevamp publish

The build number would increment automatically.
Version and sub-version are up to the user.

### Submitting for review ###
Once a developer has tested their widget/theme, they can submit it for review by the Pagevamp team.
The pagevamp team would test the widget/theme and review its code.

Once checked and validated, the theme/widget would be published to the app-store, available to every users.

    pagevamp submit


## Other Commands ##

### logout ###

A user might want to logout, to let another user log in, or change account.

    pagevamp logout

### status ###

A user might want to check the status of his project.

    pagevamp status

Returns something like that:

    Project Name:		HelloWorld
    Published version: 	1.2.45		jul-05-2014
	Dev version:		1.3.1		<unpublished>
	...