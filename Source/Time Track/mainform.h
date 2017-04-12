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

    void ConnectSetup();
    void DisconnectSetup();
    void ConnectServer();
    void DisconnectServer();

    void checkIfFileNameIsValid(QString x);
    QString getCorrectFileName();
    bool validData(QString path);
    bool fileExists(QString path);

    QDateTime format_datetimes(QDateTime z);

    void showtheThings();
    void hidetheThings();
    void isConnected();

    void setIcons();
    void loginInitialize();
    void basicInitialize();
    void advInitialize();

    void establishConnections();

    void EmployeeTab();
    QSqlQueryModel * EmployeeModel();

    void ProjectTab();
    QSqlQueryModel * ProjectModel();
    QSqlQueryModel * ProjectItemModelFirst();
    QSqlQueryModel * ProjectItemModel();

    QSqlQueryModel * ProjectItemModelRefresh();
    void refreshProjectItemTab();
    void refreshProjectItemCombo();

    void ItemTab();
    QSqlQueryModel * ItemModel();

    void ShiftTab();
    QSqlQueryModel* ShiftModel();

    QSqlDatabase getData() const;

    /* Not going to lie there isn't a bunch of though
     * put into this file, and I dont want to think of
     * it right now xd
     */
public slots:

    void reenter();

    void on_basicPageClockIn_clicked();
    void on_basicPageClockOut_clicked();
    void on_basicPageConnect_clicked();
    void on_basicPageAdvanced_clicked();
    void on_mainFinish_clicked();

    void refreshShiftEmployee();
    void refreshShiftProject();
    void refreshShiftItem();

private slots:

    void on_HeaderTabs_currentChanged(int index);

    //Employee Tab!

    void refreshEmployeeStuff();
    void refreshEmployeeTab();
    void on_EmployeeName_clicked();
    void on_EmployeePin_clicked();
    void on_EmployeeAdminStatus_clicked();
    void on_EmployeeShiftCount_clicked();
    void on_EmployeeActive_clicked();
    void on_EmployeeId_clicked();
    void on_EmployeeCurrent_clicked();
    void on_EmployeeAdd_clicked();
    int generateRandom();
    void on_EmployeeDelete_clicked();
    void on_EmployeeArchive_clicked();
    void on_AllRadio_toggled(bool checked);
    void on_CurrentRadio_toggled(bool checked);
    void on_PastRadio_toggled(bool checked);

    //Project Tab!

    void refreshProjectStuff();
    void refreshProjectTab();
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
    void on_ProjectItemName_clicked();
    void on_ProjectItemId_clicked();
    void on_ProjectItemAdd_clicked();
    void on_ProjectItemRemove_clicked();
    void on_ProjectDate_clicked();

    //Item Tab!

    void refreshItemStuff();
    void refreshItemTab();
    void on_ItemAdd_clicked();
    void on_ItemDelete_clicked();
    void on_ItemName_clicked();
    void on_ItemId_clicked();
    void on_ItemCategory_clicked();
    void on_ItemSub_clicked();
    void on_ItemDimension_clicked();

    //Shift Tab!

    void refreshShiftTab();
    void on_ShiftEmployeeBox_clicked();
    void on_ShiftProjectBox_clicked();
    void on_ShiftItemBox_clicked();
    void on_ShiftEmployeeCombo_currentTextChanged(const QString &arg1);
    void on_ShiftProjectCombo_currentTextChanged(const QString &arg1);
    void on_ShiftItemCombo_currentTextChanged(const QString &arg1);
    void on_ShiftDate1_dateChanged(const QDate &date);
    void on_ShiftDate2_dateChanged(const QDate &date);
    void on_ShiftAdd_clicked();
    void on_ShiftEdit_clicked();
    void on_ShiftDelete_clicked();

    //Datebase Tab!

    void DatabaseTab();
    void on_DataBaseConnect_clicked();    
    void on_DataBaseDisconnect_clicked();

    //Settings Tab!

    void on_SettingsMaximized_clicked();
    void on_SettngsFullScreen_clicked();




    void on_passEdit_returnPressed();

private:
    Ui::MainForm *ui;
    ClockoutForm *clockoutForm;
    ShiftEditForm * shifteditform;
    QSqlDatabase data;
    QSqlDatabase setup;
    QString serverPath;
    QString localPath;
    QString id;
    bool admin;
    QString pin;
};

#endif // MAINFORM_H












