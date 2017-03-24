#-------------------------------------------------
#
# Project created by QtCreator 2017-03-02T17:57:04
#
#-------------------------------------------------

QT       += core gui sql

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Labor-Tracker
TEMPLATE = app


SOURCES += main.cpp \
    mainform.cpp \
    loginform.cpp \
    clockoutform.cpp

HEADERS  += \
    mainform.h \
    loginform.h \
    clockoutform.h

FORMS    += \
    mainform.ui \
    loginform.ui \
    clockoutform.ui
