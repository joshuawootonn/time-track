#include "work.h"

Work::Work(QObject *parent) : QObject(parent)
{


}

Work::~Work()
{
}

void Work::ping(){
        emit progress(10);
        QString o = "192.168.41.187";
        int exitCode = QProcess::execute("ping", QStringList()
                                             << "-n" << "1"
                                             << o);
        emit progress(30);
        bool valid;
        if (exitCode==0) {
            valid = true;
        } else {
            valid = false;
        }

        emit progress(100);
        emit done(valid);
}
