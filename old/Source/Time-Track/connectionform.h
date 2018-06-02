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
    QString getDatabase() const;
    QString getPort() const;
    QString getUsername() const;
    QString getPassword() const;
    QString getIp() const;
    void setError(QString x);
    void read();

private slots:    
    void on_connect_clicked();
    void on_databaseEdit_textChanged(const QString &arg1);
    void on_portEdit_textChanged(const QString &arg1);
    void on_usernameEdit_textChanged(const QString &arg1);
    void on_passwordEdit_textChanged(const QString &arg1);
    void on_ipEdit_currentTextChanged(const QString &arg1);





    void on_ipEdit2_textChanged(const QString &arg1);

signals:
    void finished();

private:
    void write();

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
