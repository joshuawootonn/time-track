#include "myeventfilter.h"

MyEventFilter::MyEventFilter(QObject *parent) :
    QObject(parent)
{

}
bool MyEventFilter::eventFilter(QObject *obj, QEvent *ev)
{

    if(ev->type() == QEvent::KeyPress ||ev->type()== QEvent::MouseButtonPress||ev->type()==QEvent::HoverMove||ev->type()==QEvent::MouseMove){

        emit active();
    }
    else
        return QObject::eventFilter(obj, ev);
    return false;



}
