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
#include "connectionform.h"
#include "exportform.h"
#include "employeeeditform.h"
#include "itemeditform.h"
#include "projecteditform.h"

#include "xlsxdocument.h"
#include "xlsxrichstring.h"
#include "xlsxabstractsheet.h"
#include "xlsxworkbook.h"
#include "xlsxformat.h"
#include <QCompleter>
#include <QMessageBox>
#include <QFontDatabase>




namespace Ui {
class MainForm;
}

class MainForm : public QWidget
{
    Q_OBJECT

public:
    explicit MainForm(QWidget *parent = 0);
    ~MainForm();
    bool eventFilter(QObject* object,QEvent* event);


    bool Connect(QString database,QString port,QString username,QString password,QString ip);
    void establishConnections();
    QDateTime format_datetimes(QDateTime z);
    void showtheThings();
    void hidetheThings();
    void isConnected();
    void setIcons();
    void basicInitialize();
    void advInitialize();

    void EmployeeTab();
    QSqlQueryModel * EmployeeModel();
    QSortFilterProxyModel * EmployeeFilterModel();
    void ProjectTab();
    QSqlQueryModel * ProjectModel();
    QSortFilterProxyModel * ProjectFilterModel();
    void refreshProjectItemTab();
    void ItemTab();
    QSqlQueryModel * ItemModel();
    QSortFilterProxyModel * ItemFilterModel();
    void ShiftTab();
    QSqlQueryModel* ShiftModel();
    QSortFilterProxyModel* ShiftFilterModel();
    QSqlDatabase getData() const;

public slots:

    void reenter();
    void start();
    void loginInitialize();
    void on_basicPageClockIn_clicked();
    void on_basicPageClockOut_clicked();
    void on_basicPageConnect_clicked();
    void on_basicPageAdvanced_clicked();
    void on_mainFinish_clicked();
    void on_basicPagePower_clicked();
    void refreshShiftEmployee();
    void refreshShiftProject();
    void refreshShiftItem();

private slots:

    void on_HeaderTabs_currentChanged(int index);

    //Login Tab!

    void on_passEdit_returnPressed();
    void on_Login0_clicked();
    void on_Login9_clicked();
    void on_Login1_clicked();
    void on_Login2_clicked();
    void on_Login3_clicked();
    void on_Login4_clicked();
    void on_Login5_clicked();
    void on_Login6_clicked();
    void on_Login7_clicked();
    void on_Login8_clicked();
    void on_LoginBack_clicked();
    void on_LoginGo_clicked();

    //Employee Tab!

    void refreshEmployeeStuff();
    void refreshEmployeeTab();
    void displayEmployeeSuccess();
    void refreshFromEmployeeEdit();
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
    void on_EmployeeEdit_clicked();
    void on_AllRadio_toggled(bool checked);
    void on_CurrentRadio_toggled(bool checked);
    void on_PastRadio_toggled(bool checked);

    //Project Tab!

    void refreshProjectStuff();
    void refreshProjectTab();
    void displayProjectSuccess();
    void refreshFromProjectEdit();
    void on_ProjectView_clicked(const QModelIndex &index);
    void on_ProjectAdd_clicked();
    void on_ProjectDelete_clicked();
    void on_ProjectArchive_clicked();
    void on_ProjectName_clicked();
    void on_ProjectId_clicked();
    void on_ProjectCurrent_clicked();
    void on_ProjectDate_clicked();
    void on_ProjectAllRadio_toggled(bool checked);
    void on_ProjectCurrentRadio_toggled(bool checked);
    void on_ProjectPastRadio_toggled(bool checked);
    void on_ProjectItemName_clicked();
    void on_ProjectItemId_clicked();    
    void on_ProjectItemQuantity_clicked();
    void on_ProjectItemDimension_clicked();
    void on_ProjectItemEstHours_clicked();
    void on_ProjectItemEstHourUnit_clicked();
    void on_ProjectItemActHours_clicked();
    void on_ProjectItemActHourUnit_clicked();
    void on_ProjectItemDifference_clicked();


    //Item Tab!

    void refreshItemStuff();
    void refreshItemTab();
    void displayItemSuccess();
    void refreshFromItemEdit();
    void on_ItemAdd_clicked();
    void on_ItemEdit_clicked();
    void on_ItemDelete_clicked();
    void on_ItemName_clicked();
    void on_ItemId_clicked();
    void on_ItemCategory_clicked();
    void on_ItemSub_clicked();
    void on_ItemDimension_clicked();

    //Shift Tab!

    void refreshShiftTab();
    void displayShiftSuccess();
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

    //Settings Tab!

    void SettingsTab();
    void on_SettingsMax_clicked();
    void on_SettingsFull_clicked();
    void on_SettingsExport_clicked();
    void exportToExcel();
    void on_SettingsPrint_clicked();
    void on_SettingsAll_clicked();
    void on_SettingsConnections_clicked();




    void on_basicPageFinish_clicked();

public:
    Ui::MainForm *ui;

private:
    //Employee table model
    QSortFilterProxyModel * employeefiltermodel;
    QSqlQueryModel * employeemodel;

    //Project table model
    QSortFilterProxyModel * projectfiltermodel;
    QSqlQueryModel * projectmodel;
    void refreshProjectItemTable();

    //Item table model
    QSortFilterProxyModel * itemfiltermodel;
    QSqlQueryModel * itemmodel;

    //Shift table model
    QSortFilterProxyModel * shiftfiltermodel;
    QSqlQueryModel * shiftmodel;

    //Class objects
    ClockoutForm * clockoutForm;
    ShiftEditForm * shifteditform;
    ConnectionForm * connectionForm;
    ExportForm * exportForm;
    EmployeeEditForm * employeeeditform;
    ItemEditForm * itemeditform;
    ProjectEditForm * projecteditform;

    //Random variables :)
    QString currentProject;
    QSqlDatabase data;
    QSqlDatabase setup;
    QString serverPath;
    QString localPath;
    QString id;
    bool admin;
    QString pin;
    QString ip;
};

#endif // MAINFORM_H









