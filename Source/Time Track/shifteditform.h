#ifndef SHIFTEDITFORM_H
#define SHIFTEDITFORM_H

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
class ShiftEditForm;
}

class ShiftEditForm : public QDialog
{
    Q_OBJECT

public:
    explicit ShiftEditForm(QWidget *parent = 0);
    ~ShiftEditForm();

    void AddShift();
    void EditFinishedShift(QString shiftid);
    void EditWorkingShift(QString Shiftid,QString id);
    void EmployeeInitialize();
    void ProjectInitialize();
    void ItemInitialize();
    void TimesInitialize();
    void TimeLeft();
    void LunchInitialize();


private slots:    
    void on_Projects_currentIndexChanged();
    void on_Add_clicked();
    void on_Delete_clicked();
    void on_Sections_cellClicked(int row, int column);
    void on_Sections_cellChanged();
    void on_Lunch_currentTextChanged(const QString &arg1);
    void on_DateTime1_dateTimeChanged(const QDateTime &dateTime);
    void on_DateTime2_dateTimeChanged(const QDateTime &dateTime);

    void on_FinishedButton_clicked();
    void on_CancelButton_clicked();
signals:
    void finished();
private:
    Ui::ShiftEditForm *ui;
    QString shiftId;
    QSqlDatabase data;
    int selectedRow;
    QString totalTime;
    QDateTime format_datetimes(QDateTime z);
};
#endif // SHIFTEDITFORM_H
