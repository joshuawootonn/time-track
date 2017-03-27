#ifndef LOGINFORM_H
#define LOGINFORM_H

#include <QWidget>
#include <QDialog>
#include <QStackedWidget>
#include <QComboBox>
#include <QtSql>
#include <windows.h>
#include <QVariant>
#include <QWidget>
#include <QDesktopWidget>
#include <QCoreApplication>
#include <QStyle>
#include <QDesktopWidget>

namespace Ui {
class LoginForm;
}

class LoginForm : public QDialog
{
    Q_OBJECT

public:
    explicit LoginForm(QWidget *parent = 0);
    ~LoginForm();

    QString id;
    bool admin;
    void reset();

signals:
    void logged();
public slots:


    void on_passEdit_returnPressed();

private:
    Ui::LoginForm *ui;

    QSqlDatabase employeeDataBase;
    QSqlDatabase projectDataBase;
    QSqlDatabase data;

    QString pin;


};

#endif // LOGINFORM_H
