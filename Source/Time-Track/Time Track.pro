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
    shifteditform.cpp \
    connectionform.cpp

HEADERS  += \
    mainform.h \
    clockoutform.h \
    shifteditform.h \
    connectionform.h

FORMS    += \
    mainform.ui \
    clockoutform.ui \
    shifteditform.ui \
    connectionform.ui

RESOURCES +=

DISTFILES += \
    ../../Qss/default.qss

win32: LIBS += -L$$PWD/../lib/ -llibmysql

INCLUDEPATH += $$PWD/../
DEPENDPATH += $$PWD/../
