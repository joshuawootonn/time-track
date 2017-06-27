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

SOURCES += \
    mainform.cpp \
    clockoutform.cpp \
    shifteditform.cpp \
    connectionform.cpp \
    exportform.cpp \    
    main.cpp \
    work.cpp


HEADERS  += \
    mainform.h \
    clockoutform.h \
    shifteditform.h \
    connectionform.h \
    exportform.h \
    work.h


FORMS    += \
    mainform.ui \
    clockoutform.ui \
    shifteditform.ui \
    connectionform.ui \
    exportform.ui

RESOURCES += \
    fonts.qrc

DISTFILES += \
    ../../Qss/default.qss

win32: LIBS += -L$$PWD/../lib/ -llibmysql

INCLUDEPATH += $$PWD/../
DEPENDPATH += $$PWD/../

include(excel_stuff/qtxlsx.pri)
