#ifndef MAINFORM_H
#define MAINFORM_H

#include <QWidget>
#include <QStackedWidget>
#include <QComboBox>
#include <QtSql>
#include <windows.h>
#include <QVariant>
#include <QWidget>
#include <QDesktopWidget>
#include <QCoreApplication>
#include <mainform.h>
#include "loginform.h"
#include "clockoutform.h"
#include "shifteditform.h"
namespace Ui {
class MainForm;
}

class MainForm : public QWidget
{
    Q_OBJECT

public:
    explicit MainForm(QWidget *parent = 0);
    ~MainForm();
    void Connect();
    void Disconnect();
    void establishConnections();
    bool fileExists(QString path);
    void showtheThings();
    void hidetheThings();
    void loginInitialize();
    void mainInitialize();
    void basicInitialize();
    void advInitialize();

    //EmployeeTab
    void EmployeeTab();
    QSqlQueryModel * EmployeeModel();
    void refreshEmployeeTab();

    void ShiftTab();

    QSqlQueryModel* ShiftModel();
    //void refreshShiftTab();
    void refreshShiftEmployee();
    void refreshShiftProject();
    void refreshShiftItem();

    void ProjectTab();
    QSqlQueryModel * ProjectModel();
    QSqlQueryModel * ProjectItemModel();
    QSqlQueryModel * ProjectItemModel(QString id);
    void refreshProjectTab();
    void refreshProjectItemTab();
    void refreshProjectItemCombo();

    void ItemTab();
    QSqlQueryModel * ItemModel();
    void refreshItemTab();

    QSqlDatabase getEmployeeDataBase() const;

    QSqlDatabase getProjectDataBase() const;

    QSqlDatabase getData() const;

public slots:
    void enter();
    void reenter();
    QDateTime format_datetimes(QDateTime z);
    void on_basicPageClockIn_clicked();
    void on_basicPageClockOut_clicked();
    void on_basicPageAdvanced_clicked();
    void on_mainFinish_clicked();
private slots:
    void on_EmployeeName_clicked();
    void on_EmployeePin_clicked();
    void on_EmployeeAdminStatus_clicked();

    void on_EmployeeShiftCount_clicked();
    void on_EmployeeActive_clicked();
    void on_EmployeeId_clicked();
    void on_EmployeeCurrent_clicked();

    void on_EmployeeAdd_clicked();
    void on_EmployeeDelete_clicked();
    void on_EmployeeArchive_clicked();

    void on_AllRadio_toggled(bool checked);
    void on_CurrentRadio_toggled(bool checked);
    void on_PastRadio_toggled(bool checked);



    void on_ShiftEmployeeCombo_currentTextChanged(const QString &arg1);

    void on_ShiftProjectCombo_currentTextChanged(const QString &arg1);

    void on_ShiftItemCombo_currentTextChanged(const QString &arg1);

    void on_ProjectView_clicked(const QModelIndex &index);

    void on_ProjectAdd_clicked();

    void on_ProjectDelete_clicked();

    void on_ProjectArchive_clicked();

    void on_ProjectName_clicked();

    void on_ProjectId_clicked();

    void on_ProjectCurrent_clicked();

    void on_ProjectAllRadio_toggled(bool checked);

    void on_ProjectCurrentRadio_toggled(bool checked);

    void on_ProjectPastRadio_toggled(bool checked);

    void on_ItemAdd_clicked();

    void on_ItemDelete_clicked();

    void on_ItemName_clicked();

    void on_ItemId_clicked();

    void on_ItemCategory_clicked();

    void on_ItemSub_clicked();

    void on_ItemDimension_clicked();

    void refreshShiftTab();



    void on_ProjectItemName_clicked();

    void on_ProjectItemId_clicked();

    void on_ProjectItemAdd_clicked();
    
    void on_ProjectItemRemove_clicked();
    
    void on_HeaderTabs_currentChanged(int index);

    void on_ShiftDate1_dateChanged(const QDate &date);

    void on_ShiftDate2_dateChanged(const QDate &date);


    void on_ShiftAdd_clicked();

    void on_ShiftEdit_clicked();

    void on_ShiftDelete_clicked();

private:
    Ui::MainForm *ui;
    LoginForm *loginForm;
    ClockoutForm *clockoutForm;
    ShiftEditForm * shifteditform;
    QSqlDatabase employeeDataBase;
    QSqlDatabase projectDataBase;
    QSqlDatabase data;

    QString id;
    bool admin;
};

#endif // MAINFORM_H











