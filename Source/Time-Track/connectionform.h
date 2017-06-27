#ifndef CONNECTIONFORM_H
#define CONNECTIONFORM_H

#include <QDialog>
#include "work.h"

namespace Ui {
class ConnectionForm;
}

class ConnectionForm : public QDialog
{
    Q_OBJECT

public:
    explicit ConnectionForm(QWidget *parent = 0);
    ~ConnectionForm();
    void auto_connect();

    QString getConnectionName();

private slots:
    void loadConnection(bool s);
    void pingConnection();
    void on_connect_clicked();

    void on_edit_returnPressed();

signals:
    void finished();


private:
    void write();
    void read();

    Ui::ConnectionForm *ui;
    QString address;
    bool automatic;

};

#endif // CONNECTIONFORM_H
