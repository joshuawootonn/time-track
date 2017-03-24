#ifndef INPUT_DIALOG_H
#define INPUT_DIALOG_H

#include <QDialog>
#include <QtSql>
#include <QObject>
#include <QWidget>
#include <QCoreApplication>
#include "myeventfilter.h"


namespace Ui {
class Input_Dialog;
}

class Input_Dialog : public QDialog
{
    Q_OBJECT

public:
    explicit Input_Dialog(QWidget *parent=0);
    ~Input_Dialog();


    /* Name: setPage
     * Purpose: Change what menu you are looking at */
    void setPage(int x);

    /* Name: Connect/Disconnect Employees
     * Purpose: Connect and Disconnect to and from the databases */
    void ConnectEmployees();
    void DisconnectEmployees();

    /* Name: hideEvent
     * Purpose: Initialize the event "hidden" for when the window is closed */
    void hideEvent(QHideEvent *ev);

signals:
    void hidden();
    void inactive();

private:


    /* Section: Item
     * Purpose: Adding an item to itemlist in the projectDataBase
     */ 
    void Item_update_combo_0();
    void Item_update_combo_1();
    void Item_update_combo_2();
    void Item_update_combo_3();


    Ui::Input_Dialog *ui;
    QTimer *idle_timer;

    MyEventFilter *filter;

    int prev;
    QTimer *count_down;
    QTimer *decrement;
    int timeLeft;
    QSqlDatabase employeeDataBase;
    QSqlDatabase projectDataBase;


private slots:


    /* Section: Employee
     * Purpose: Adding an employee to employeelist in the employeeDataBase
     */
    void on_Employee_Name_edit_textChanged();
    void on_Employee_Pin_Edit_textChanged();
    void on_Employee_Admin_CheckBox_stateChanged();
    void on_Employee_Finished_clicked();
    void on_Employee_Cancel_clicked();
    void on_Employee_Wage_spinBox_valueChanged(int arg1);

    /* Section: Project
     * Purpose: Adding an project to projectlist in the projectDataBase
     */
    void on_Project_Finished_clicked();
    void on_Project_Cancel_clicked();
    void on_Project_Project_Edit_textChanged();

    /* Section: Item
     * Purpose: Adding an item to itemlist in the projectDataBase
     */
    void on_Item_Combo_1_currentIndexChanged(const QString &arg1);
    void on_Item_Combo_2_currentIndexChanged(const QString &arg1);
    void on_Item_Finish_clicked();
    void on_Item_Cancel_clicked();
    void on_Item_Time_Spin_valueChanged(const QString &arg1);
    void on_Item_Cost_Spin_valueChanged(const QString &arg1);


    /* Section: Timeout
     * Purpose: Handling user inactivity
     */

    void on_Timeout_button_yes_clicked();
    void on_Timeout2_button_yes_clicked();
    void on_Timeout_inactive();
    void idle_user();
    void adjust_timer();
    void when_active();


};

#endif // INPUT_DIALOG_H
