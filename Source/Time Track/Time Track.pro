#-------------------------------------------------
#
# Project created by QtCreator 2017-03-02T17:57:04
#
#-------------------------------------------------

QT       += core gui sql

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Time Track
TEMPLATE = app

win32: RC_ICONS = icon.ico

SOURCES += main.cpp \
    mainform.cpp \
    clockoutform.cpp \
    shifteditform.cpp

HEADERS  += \
    mainform.h \
    clockoutform.h \
    shifteditform.h

FORMS    += \
    mainform.ui \
    clockoutform.ui \
    shifteditform.ui

RESOURCES +=

DISTFILES += \
    ../../Qss/default.qss
