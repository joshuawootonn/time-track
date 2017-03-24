#-------------------------------------------------
#
# Project created by QtCreator 2016-11-12T13:36:21
#
#-------------------------------------------------

QT       += core gui sql

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = AACI-Labor-Tracking
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    input_dialog.cpp \
    myeventfilter.cpp

HEADERS  += mainwindow.h \
    input_dialog.h \
    myeventfilter.h

FORMS    += mainwindow.ui \
    input_dialog.ui

RESOURCES += \
    aaci_resources.qrc
