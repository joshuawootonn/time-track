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
    bool eventFilter(QObject* object,QEvent* event);
    void auto_connect();

    QString getDatabase() const;
    QString getPort() const;
    QString getUsername() const;
    QString getPassword() const;
    QString getIp() const;
    void setError(QString x);

private slots:    
    void on_connect_clicked();
    void on_databaseEdit_textChanged(const QString &arg1);
    void on_portEdit_textChanged(const QString &arg1);
    void on_usernameEdit_textChanged(const QString &arg1);
    void on_passwordEdit_textChanged(const QString &arg1);
    void on_ipEdit_textChanged(const QString &arg1);
    void on_testConnection_clicked();
    void loadConnection(bool s);

signals:
    void finished();

private:
    void write();
    void read();    
    void pingConnection();

    Ui::ConnectionForm *ui;
    QString database;
    QString port;
    QString username;
    QString password;
    QString ip;
    bool automatic;

};

#endif // CONNECTIONFORM_H
