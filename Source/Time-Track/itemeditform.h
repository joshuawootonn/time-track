#ifndef ITEMEDITFORM_H
#define ITEMEDITFORM_H

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
#include <QList>
namespace Ui {
class ItemEditForm;

}

class ItemEditForm : public QDialog
{
    Q_OBJECT

public:
    explicit ItemEditForm(QWidget *parent = 0);
    ~ItemEditForm();
    void AddItem();
    QString AddValid();
    void EditItem(QString x);
    QString EditValid();
    bool getSuccess() const;
    QString getSuccessMsg() const;

signals:
    void finished();

private slots:
    void on_FinishButton_clicked();
    void on_CancelButton_clicked();

private:
    Ui::ItemEditForm *ui;
    QSqlDatabase data;
    bool success;
    QString successMsg;
    QString task;
    QString id;
};

#endif // ITEMEDITFORM_H
