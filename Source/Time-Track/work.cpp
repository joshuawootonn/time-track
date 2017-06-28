#include "work.h"

Work::Work(QObject *parent) : QObject(parent)
{


}

Work::~Work()
{
}

void Work::ping(){
        emit progress(25);
        int exitCode = QProcess::execute("ping", QStringList()
                                             << "-n" << "1"
                                             << connection);
        emit progress(60);
        bool valid;
        if (exitCode==0) {
            valid = true;
        } else {
            valid = false;
        }

        emit progress(100);
        emit done(valid);
}
