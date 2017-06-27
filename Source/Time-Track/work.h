#ifndef WORK_H
#define WORK_H

#include <QObject>
#include <QProcess>

class Work : public QObject
{
    Q_OBJECT
public:
    explicit Work(QObject *parent = nullptr);
    virtual ~Work();


signals:
    void progress(int);
    void done(bool);

public slots:
    void ping();

};

#endif // WORK_H
