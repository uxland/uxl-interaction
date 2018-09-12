# \<uxl-interaction\>

A interaction service component

[![Build Status](https://travis-ci.org/uxland/uxl-interaction.svg?branch=master)](https://travis-ci.org/uxland/uxl-interaction)
[![npm version](https://badge.fury.io/js/%40uxland%2Fuxl-interaction.svg)](https://badge.fury.io/js/%40uxland%2Fuxl-interaction)

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

### Description

`<uxl-interaction>` is a component that provides a material design based interaction service for your application.

### Usage

The component provides 2 methods that correspond to 2 modes of interaction with the user:

`doConfirm(options, localizer)` : provides a dialog that interrupts the flow of use of the application to ask for some type of confirmation, either through a message, form or customized information.

`notify(options, localizer)` : provides a snackbar to notify the user of some information related to the flow of the application

The component can be can customized through passing some **properties** to the methods what we have seen.

### `doConfirm()` options:

`title?: string;`: text that displays on dialog header

`titleArgs?: Object;`: arguments for the title

`message?: string;`: text that displays on dialog content

`messageArgs?: Object;` arguments for the message

`showCloseButton?: boolean;`: set to true if you want a close button on header

`type?: ConfirmType;`: the type of interaction, that provides color theming. You can choose for ***danger' | 'warning' | 'info' | 'success'***

`fullScreen?: boolean;`: set to true if you want display the dialog on fullscreen

`styles?: ConfirmStyles;`: an object that provides some variables to customize parts from dialog like background color, button colors, etc

`acceptLabel?: string;`: the text that displays on accept button label

`cancelLabel?: string;`: the text that displays on cancel button label

`modal?: boolean;`: set to true if you want to display the dialog on ***modal*** mode. This option, disables outside dialog click and display a black foreground, to focus user on dialog

`headerDismiss?: boolean;`: set to true if you want to close dialog clicking on header region

`withoutActions?: boolean;`: set to true if you want to hide the actions from dialog. For example, if you want to use dialog to only show information

`htmlTag?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template 

`htmlUrl?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`model?: T;`: if you want pass a custom model to display some information for your application, set these property with your custom data. 

### `notify()` options:

`message?: string;`: text that displays on snackbar content

`messageArgs?: Object;`: arguments for the message

`htmlTag?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`htmlUrl?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`delay?: number;`: the time that snackbar remains on screen after call

`showCloseButton?: boolean;`: set to true if you want a close button on snackbar

`type?: NotifyType;`: the type snackbar, that provides color theming. You can choose for ***danger' | 'warning' | 'info' | 'success'***

`position?: NotifyPosition;`: the position of snackbar on the screen. You can choose for ***'bottom' | 'center' | 'top'***

`styles?: NotifyStyles;`: an object that provides some variables to customize parts from dialog like background color, button colors, etc

`classifiers?: NofifyClassifiers[];`: an array of classes to custom more the snackbar. 

`model?: T;`: if you want pass a custom model to display some information for your application, set these property with your custom data.

###Localizer

You can pass a custom localizer function to `doConfirm()` and `notify()` methods to localize the messages displayed on interaction components.

###NotifyMixin and ConfirmMixin

This component, provides a ***Mixins*** to implement on your custom templates when you pass a custom component via ***htmlTag*** and ***htmlUrl***.
This Mixin, provides to your custom templates, the ***model*** property and some methods to overwrite ***accept()*** or ***canAccept()*** methods, if you want to do some validation before user confirm the interaction.