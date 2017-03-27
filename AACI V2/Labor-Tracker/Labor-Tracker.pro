#-------------------------------------------------
#
# Project created by QtCreator 2017-03-02T17:57:04
#
#-------------------------------------------------

QT       += core gui sql

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Labor-Tracker
TEMPLATE = app

win32: RC_ICONS = icon.ico

SOURCES += main.cpp \
    mainform.cpp \
    loginform.cpp \
    clockoutform.cpp \
    shifteditform.cpp

HEADERS  += \
    mainform.h \
    loginform.h \
    clockoutform.h \
    shifteditform.h

FORMS    += \
    mainform.ui \
    loginform.ui \
    clockoutform.ui \
    shifteditform.ui

RESOURCES +=
