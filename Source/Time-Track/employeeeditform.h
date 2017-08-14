#ifndef EMPLOYEEEDITFORM_H
#define EMPLOYEEEDITFORM_H

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
#include <QStringList>
#include <QDesktopWidget>
#include <QTimeEdit>
#include <random>

namespace Ui {
class EmployeeEditForm;
}

class EmployeeEditForm : public QDialog
{
    Q_OBJECT

public:
    explicit EmployeeEditForm(QWidget *parent = 0);
    ~EmployeeEditForm();
    bool eventFilter(QObject* object,QEvent* event);
    void AddEmployee();
    QString AddValid();
    int generateRandom();
    void EditEmployee(QString id);
    QString EditValid();

    bool getSuccess() const;
    QString getSuccessMsg() const;

private slots:
    void on_FinishButton_clicked();

    void on_CancelButton_clicked();

    void on_GenerateButton_clicked();

    void on_pin_returnPressed();


signals:
    void finished();
private:
    Ui::EmployeeEditForm *ui;
    QSqlDatabase data;
    bool success;
    QString successMsg;
    QString task;
    QString id;
};

#endif // EMPLOYEEEDITFORM_H
