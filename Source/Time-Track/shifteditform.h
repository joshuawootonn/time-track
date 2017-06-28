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
#include <QStringList>
#include <QDesktopWidget>
#include <QTimeEdit>


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
    void updateShiftEdit();

    void EmployeeInitialize();
    void ProjectInitialize();
    void ItemInitialize();
    void TimesInitialize();
    void TimeLeft();
    void LunchInitialize();
    bool getSuccess() const;

private slots:
    void on_Projects_currentIndexChanged(const QString &arg1);
    void on_Add_clicked();
    void on_Delete_clicked();
    void on_Sections_cellClicked(int row, int column);
    void on_Sections_cellChanged();
    void on_Lunch_currentTextChanged(const QString &arg1);
    void on_DateTime1_dateTimeChanged(const QDateTime &dateTime);
    void on_DateTime2_dateTimeChanged(const QDateTime &dateTime);
    void on_Description_textChanged();

    void on_FinishedButton_clicked();
    void on_CancelButton_clicked();
    void on_RefreshButton_clicked();





    void on_Lunch_timeChanged(const QTime &time);

    void on_Description_Check_clicked();


    void on_Projects_currentTextChanged(const QString &arg1);

signals:
    void finished();
private:
    bool deactivate;
    Ui::ShiftEditForm *ui;
    QString shiftId;
    QSqlDatabase data;
    int selectedRow;
    bool clicked;
    bool success;
    QString totalTime;
    QDateTime format_datetimes(QDateTime z);
};



class myTime : public QTimeEdit
{
    Q_OBJECT
    public:
    virtual void stepBy(int steps)
    {
        if (this->time().minute()==59 && steps>0){
            setTime(QTime(time().hour()+1,0,time().second(),time().msec()));
        }else if(this->time().minute()==00 && steps<0){
            setTime(QTime(time().hour()-1,59,time().second(),time().msec()));
        }else{
            QTimeEdit::stepBy(steps);
        }
    }
};
#endif // SHIFTEDITFORM_H
