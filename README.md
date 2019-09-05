# UXL Interaction [![npm version](https://badge.fury.io/js/%40uxland%2Fuxl-interaction.svg)](https://badge.fury.io/js/%40uxland%2Fuxl-interaction)

| Build Status                                                                                                              | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| [![Build Status](https://api.travis-ci.org/uxland/uxl-interaction.svg)](https://api.travis-ci.org/uxland/uxl-interaction) | ![Statements](https://img.shields.io/badge/Coverage-Unknown%25-brightgreen.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-Unknown%25-brightgreen.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-Unknown%25-brightgreen.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-Unknown%25-brightgreen.svg 'Make me better!') |

## Installation

`npm i @uxland/uxl-interaction`

### Description

`<uxl-interaction>` is a component that provides a material design based interaction service for your application.

### Usage

The component provides 2 methods that correspond to 2 modes of interaction with the user:

`doConfirm(options, localizer)` : provides a dialog that interrupts the flow of use of the application to ask for some type of confirmation, either through a message, form or customized information.

`notify(options, localizer)` : provides a snackbar to notify the user of some information related to the flow of the application

The component can be can customized through passing some **properties** to the methods what we have seen.

### Mode `doConfirm()`

#### Options

`containerId?: string;`: id for the parent container

`title?: string;`: text that displays on dialog header

`titleArgs?: Object;`: arguments for the title

`message?: string;`: text that displays on dialog content

`messageArgs?: Object;` arguments for the message

`showCloseButton?: boolean;`: set to true if you want a close button on header

`type?: ConfirmType;`: the type of interaction, that provides color theming. You can choose for **_danger' | 'warning' | 'info' | 'success'_**

`fullScreen?: boolean;`: set to true if you want display the dialog on fullscreen

`styles?: ConfirmStyles;`: an object that provides some variables to customize parts from dialog like background color, button colors, etc

`acceptLabel?: string;`: the text that displays on accept button label

`cancelLabel?: string;`: the text that displays on cancel button label

`modal?: boolean;`: set to true if you want to display the dialog on **_modal_** mode. This option, disables outside dialog click and display a black foreground, to focus user on dialog

`headerDismiss?: boolean;`: set to true if you want to close dialog clicking on header region

`withoutActions?: boolean;`: set to true if you want to hide the actions from dialog. For example, if you want to use dialog to only show information

`htmlTag?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`htmlUrl?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`model?: T;`: if you want pass a custom model to display some information for your application, set these property with your custom data.

#### Styling

##### Stylable Shadow Parts

The following styleable part's of the element `confirm-component` are available for styling:

| Shadow tree part                       | Description                             | Style outside of shadow tree             |
| -------------------------------------- | --------------------------------------- | ---------------------------------------- |
| `<paper-dialog part="dialog">...`      | The confirm dialog parent element       | `confirm-component::part(dialog) {...}`  |
| `<div id="header" part="header">...`   | The header of the confirm dialog        | `confirm-component::part(header) {...}`  |
| `<h2 part="title">...`                 | The title of the confirm dialog         | `confirm-component::part(title) {...}`   |
| `<div id="content" part="content">...` | The content of the confirm dialog       | `confirm-component::part(content) {...}` |
| `<div id="actions" part="actions">...` | The action footer of the confirm dialog | `confirm-component::part(actions) {...}` |

##### Mixins

The following custom properties and mixins are available for styling:

| Custom property                              | Description                                  | Default                                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------------------- |
| `--uxl-interaction-text-color`               | Text color of the dialog                     | script option `styles: {textColor: string}`              |
| `--uxl-interaction-background-color`         | The background color of the dialog           | script option `styles: {backgroundColor: string}`        |
| `--uxl-interaction-icon-color`               | Fill color of the svg icon that close dialog | script option `styles: {closeIconColor: string}`         |
| `--uxl-interaction-accept-button-color`      | Color of the acept button of the dialog      | script option `styles: {acceptColor: string}`            |
| `--uxl-interaction-header-background-color`  | The header background color of the dialog    | script option `styles: {headerBackgroundColor: string}`  |
| `--uxl-interaction-actions-background-color` | The action background color of the dialog    | script option `styles: {actionsBackgroundColor: string}` |
| `--uxl-interaction-dialog-width`             | The width of the dialog                      | script option `styles: {width: string}`                  |
| `--uxl-interaction-dialog-height`            | The height of the dialog                     | script option `styles: {height: string}`                 |
| `--uxl-interaction-content-height`           | The content height of the dialog             | script option `styles: {height: string}`                 |

##### Variables from script option 'Styles'

The following custom properties and mixins are available for styling:

| Custom Variable          | Description                                  | Default                                                           |
| ------------------------ | -------------------------------------------- | ----------------------------------------------------------------- |
| `textColor`              | Text color of the dialog                     | `--paper-dialog-color` `--primary-text-color`                     |
| `backgroundColor`        | The background color of the dialog           | `--paper-dialog-background-color` `--primary-background-color`    |
| `closeIconColor`         | Fill color of the svg icon that close dialog | `--iron-icon-fill-color` `currentcolor`                           |
| `acceptColor`            | Color of the acept button of the dialog      | by script option `type`: 'danger', 'warning', 'info' or 'success' |
| `headerBackgroundColor`  | The header background color of the dialog    | transparent                                                       |
| `actionsBackgroundColor` | The action background color of the dialog    | transparent                                                       |
| `width`                  | The width of the dialog                      | 40vw                                                              |
| `height`                 | The height or the content of the dialog      | auto                                                              |

### Mode `notify()`

#### Options

`message?: string;`: text that displays on snackbar content

`messageArgs?: Object;`: arguments for the message

`htmlTag?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`htmlUrl?: string;`: if you want to change the content template unless display a simple message, you can pass an htmltag and htmlUrl to display your custom template

`delay?: number;`: the time that snackbar remains on screen after call

`showCloseButton?: boolean;`: set to true if you want a close button on snackbar

`type?: NotifyType;`: the type snackbar, that provides color theming. You can choose for **_danger' | 'warning' | 'info' | 'success'_**

`position?: NotifyPosition;`: the position of snackbar on the screen. You can choose for **_'bottom' | 'center' | 'top'_**

`styles?: NotifyStyles;`: an object that provides some variables to customize parts from dialog like background color, button colors, etc

`classifiers?: NofifyClassifiers[];`: an array of classes to custom more the snackbar.

`model?: T;`: if you want pass a custom model to display some information for your application, set these property with your custom data.

#### Styling

##### Stylable Shadow Parts

The following styleable part's of the element `notify-component` are available for styling:

| Shadow tree part                | Description               | Style outside of shadow tree          |
| ------------------------------- | ------------------------- | ------------------------------------- |
| `<paper-toast part="toast">...` | The notify parent element | `notify-component::part(toast) {...}` |

##### Mixins

The following custom properties and mixins are available for styling:

| Custom property                             | Description                                 | Default                                            |
| ------------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| `--uxl-interaction-notify-icon-color`       | Fill color of the svg icon that close toast | script option `styles: {iconColor: string}`        |
| `--uxl-interaction-notify-text-color`       | Text color of the toast                     | script option `styles: {textColor: string}`        |
| `--uxl-interaction-notify-background-color` | The background color of the toast           | script option `styles: {backgroundColorr: string}` |
| `--uxl-interaction-notify-padding`          | The background color of the toast           | script option `styles: {backgroundColorr: string}` |

##### Variables from script option 'Styles'

The following custom properties and mixins are available for styling:

| Custom Variable   | Description                                 | Default                                    |
| ----------------- | ------------------------------------------- | ------------------------------------------ |
| `iconColor`       | Fill color of the svg icon that close toast | `--iron-icon-fill-color` `currentcolor`    |
| `textColor`       | Text color of the toast                     | `--paper-toast-color` `#f1f1f1`            |
| `backgroundColor` | The background color of the toast           | `--paper-toast-background-color` `#323232` |

### Localizer

You can pass a custom localizer function to `doConfirm()` and `notify()` methods to localize the messages displayed on interaction components.

### NotifyMixin and ConfirmMixin

This component, provides a **_Mixins_** to implement on your custom templates when you pass a custom component via **_htmlTag_** and **_htmlUrl_**.
This Mixin, provides to your custom templates, the **_model_** property and some methods to overwrite **_accept()_** or **_canAccept()_** methods, if you want to do some validation before user confirm the interaction.
