#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "QPushButton"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    ConnectEmployees();
    ui->stackedWidget->setCurrentIndex(0);


}
MainWindow::~MainWindow()
{
    delete ui;
}



//General database Stuff
bool MainWindow::ConnectEmployees()
{



    projectDataBase = QSqlDatabase::addDatabase("QSQLITE","projectDataBase");
    employeeDataBase = QSqlDatabase::addDatabase("QSQLITE","employeeDataBase");
    //Work
    //employeeDataBase.setDatabaseName("C:/Users/joshu/Dropbox/Work/SQLite/AACILaborTracking.db");
    //projectDataBase.setDatabaseName("C:/Users/joshu/Dropbox/Work/SQLite/AACIProjectList.db");
    //ui->label->setPixmap(QPixmap("C:/Users/joshu/Dropbox/Work/AACI/AACI-Labor-Tracking/logos/logo1"));
    //Desktop
    //employeeDataBase.setDatabaseName("C:/Users/jose5/Dropbox/Work/SQLite/AACILaborTracking.db");
    //projectDataBase.setDatabaseName("C:/Users/jose5/Dropbox/Work/SQLite/AACIProjectList.db");
    //ui->label->setPixmap(QPixmap("C:/Users/jose5/Dropbox/Work/AACI/AACI-Labor-Tracking/logos/logo1"));
    //Laptop
    employeeDataBase.setDatabaseName("C:/Users/Joshua Wootonn/Dropbox/Work/SQLite/AACILaborTracking.db");
    projectDataBase.setDatabaseName("C:/Users/Joshua Wootonn/Dropbox/Work/SQLite/AACIProjectList.db");


    QString status;
    if(!employeeDataBase.open())
    {
        if(!projectDataBase.open())
            status="1 and 1";
        else
            status="1 and 0";

    }
    else
    {
        if(!projectDataBase.open())
            status="0 and 1";
        else
            status="0 and 0";

    }
    ui->statusBar->showMessage(status);

    return true;
}

void MainWindow::DisconnectEmployees()
{
    employeeDataBase.close();
    employeeDataBase.removeDatabase("employeeDataBase");
    projectDataBase.close();
    projectDataBase.removeDatabase("projectDataBase");
}




//General Classes
QString MainWindow::DateSyntax(QString wanted,QDateTime x)
{
    QString fo;
    QDate date = x.date();
    QTime time = x.time();
    if(wanted == "date")
    {
        fo=date.toString("dddd, MMMM d");
    }
    else if(wanted == "time")
    {
        if(time.minute()<7&&time.minute()>=0)
            fo = QString::number(time.hour())+":00";
        else if(time.minute()>=7&&time.minute()<23)
            fo = QString::number(time.hour())+":15";
        else if(time.minute()>=23&&time.minute()<37)
            fo = QString::number(time.hour())+":30";
        else if(time.minute()>=37&&time.minute()<53)
            fo = QString::number(time.hour())+":45";
        else if(time.minute()>=53)
            fo = QString::number(time.hour()+1)+":00";
    }

    return fo;
}

//Login Page
void MainWindow::on_login_edit_editingFinished()
{
    pin=ui->login_edit->text();


    QSqlQuery qry1(employeeDataBase),qry2(employeeDataBase);
    qry1.prepare("SELECT * FROM employeelist where pin = '"+pin+"'");

    if (qry1.exec())
    {
        int count=0;
        while(qry1.next())
        {
           count++;
        }
        if(count == 1)
        {
            QString admin;

            ui->login_label_status->setText("Valid");
            qry2.prepare("SELECT adminstatus,id FROM employeelist WHERE pin = '"+pin+"'");
            if(qry2.exec())
            {
                while(qry2.next())
                {
                    admin = qry2.value(0).toString();
                    id = qry2.value(1).toString();

                }

            }
            else
            {
                qDebug()<<"ERROR(qry2)"<<qry2.lastError();
            }
            if(admin == "0")
            {
               employee_initialize();
            }
            else if(admin == "1")
            {
               admin_initialize();
            }
        }
        if(count > 1)
            ui->login_label_status->setText("Duplicate");
        if(count < 1)
            ui->login_label_status->setText("Invalid");

    }

}




//Admin Classes
void MainWindow::on_admin_finished_clicked()
{
    ui->stackedWidget->setCurrentIndex(0);
    ui->login_edit->clear();
    ui->login_label_status->setText("");
}
void MainWindow::on_admin_clockin_clicked()
{
    QSqlQuery qry(employeeDataBase),qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase),qry4(employeeDataBase);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE id = '"+id+"'");
    if(qry.exec())
    {

        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    if(active == "1")
    {
        ui->statusBar->showMessage("Already Clocked In");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(active== "0")
    {
        QDateTime x = QDateTime::currentDateTime();
        QDateTime z = format_datetimes(x);




        QString time = z.toString("yyyy-MM-dd HH:mm:ss");
        qry1.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");

        QString shiftcount;
        if(qry1.exec())
        {

            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }

        int shiftcountInt = shiftcount.toInt();
        shiftcountInt++;
        shiftcount = QString::number(shiftcountInt);

        // Inserting clockin time and shiftnumber into pin.
        qry4.prepare("insert into '"+id+"'(clockin,shiftnumber) values('"+time+"','"+shiftcount+"')");
        if (qry4.exec())
        {

            // Setting active.
            qry2.prepare("update employeelist set active=1 where id = '"+id+"'");
            qry2.exec();
            // Setting employeelist shiftcount.
            qry3.prepare("update employeelist set shiftcount = '"+shiftcount+"' where id = '"+id+"'");
            qry3.exec();
            ui->statusBar->showMessage("Successfully Clocked In");
            Sleep(1000);
            ui->statusBar->showMessage("");

        }
        else
        {
            ui->statusBar->showMessage("Error4::" +qry4.lastError().text());
            Sleep(1000);
            ui->statusBar->showMessage("");
        }
        admin_update_tables();
    }



}
void MainWindow::on_admin_clockout_clicked()
{
    QSqlQuery qry(employeeDataBase);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE pin = '"+pin+"'");
    if(qry.exec())
    {

        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    if(active == "0")
    {
        ui->statusBar->showMessage("Already Clocked Out");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(active== "1")
    {
        clockout_initialize();
    }

}
void MainWindow::on_admin_clockin5hoursago_clicked()
{
    QSqlQuery qry(employeeDataBase),qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase),qry4(employeeDataBase);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE id = '"+id+"'");
    if(qry.exec())
    {

        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    if(active == "1")
    {
        ui->statusBar->showMessage("Already Clocked In");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(active== "0")
    {
        QDateTime x = QDateTime::currentDateTime();
        QTime f(x.time().hour()-5,x.time().minute(),x.time().second());
        x.setTime(f);

        QDateTime z = format_datetimes(x);




        QString time = z.toString("yyyy-MM-dd HH:mm:ss");
        qry1.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");

        QString shiftcount;
        if(qry1.exec())
        {

            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }

        int shiftcountInt = shiftcount.toInt();
        shiftcountInt++;
        shiftcount = QString::number(shiftcountInt);

        // Inserting clockin time and shiftnumber into pin.
        qry4.prepare("insert into '"+id+"'(clockin,shiftnumber) values('"+time+"','"+shiftcount+"')");
        if (qry4.exec())
        {

            // Setting active.
            qry2.prepare("update employeelist set active=1 where id = '"+id+"'");
            qry2.exec();
            // Setting employeelist shiftcount.
            qry3.prepare("update employeelist set shiftcount = '"+shiftcount+"' where id = '"+id+"'");
            qry3.exec();
            ui->statusBar->showMessage("Successfully Clocked In");
            Sleep(1000);
            ui->statusBar->showMessage("");

        }
        else
        {
            ui->statusBar->showMessage("Error4::" +qry4.lastError().text());
            Sleep(1000);
            ui->statusBar->showMessage("");
        }
        admin_update_tables();
    }

}
void MainWindow::on_admin_terminate_clicked()
{
    this->hide();
}
void MainWindow::on_admin_refresh_clicked()
{
    admin_update_tables();
    //qDebug()<<ui->admin_project_table->rowCount();
}
void MainWindow::on_admin_reset_clicked()
{
    QSqlQuery qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase);




    qry1.exec("DROP TABLE '1'");

    qry2.exec("CREATE TABLE '1'"
               "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR, one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");
    qry3.exec("update employeelist set shiftcount = '0',active = '0' where id='1'");
    qry1.clear();
    qry2.clear();
    qry3.clear();

    qry1.exec("DROP TABLE '2'");
    qry2.exec("CREATE TABLE '2'"
               "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR, one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");
    qry3.exec("update employeelist set shiftcount = '0',active = '0' where id='2'");
    qry1.clear();
    qry2.clear();
    qry3.clear();

    qry1.exec("DROP TABLE '4'");
    qry2.exec("CREATE TABLE '4'"
               "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR,one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");
    qry3.exec("update employeelist set shiftcount = '0',active = '0' where id='4'");
    qry1.clear();
    qry2.clear();
    qry3.clear();

    qry1.exec("DROP TABLE '5'");
    qry2.exec("CREATE TABLE '5'"
               "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR, one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");
    qry3.exec("update employeelist set shiftcount = '0',active = '0' where id='5'");
    qry1.clear();
    qry2.clear();
    qry3.clear();



}
void MainWindow::on_admin_analyze_clicked()
{
   ui->stackedWidget->setCurrentIndex(4);
   analyze_initialize();
}


void MainWindow::admin_initialize()
{
    ui->stackedWidget->setCurrentIndex(1);
    ui->admin_calendar->setSelectedDate(QDate::currentDate());
    admin_update_calendar();
    selected_id = id;
    admin_update_tables();


    ui->admin_employee_table->hide();
    ui->admin_project_table->hide();
    ui->admin_employee_edit->hide();
    ui->admin_employee_time->hide();
    ui->admin_employee_wage->hide();
    ui->admin_p_combo->hide();
    ui->admin_p_combo2->hide();
    ui->admin_p_combo3->hide();
    ui->admin_project_time->hide();
    ui->admin_p_add->hide();
    ui->admin_p_del->hide();
    ui->admin_el_add->hide();
    ui->admin_el_del->hide();
    ui->admin_el_save->hide();
    ui->admin_pl_add->hide();
    ui->admin_pl_arc->hide();
    ui->admin_pl_del->hide();
    ui->admin_pl_save->hide();






    /*selected_pl_id= ui->admin_project_list_table->item(0,1)->text();
     *
     *


    ui->label_2->setPixmap(QPixmap("C:/Users/joshu/Dropbox/Work/AACI/AACI-Labor-Tracking/logos/logo1"));*/

}
void MainWindow::admin_update_tables()
{
    admin_update_employee_list();
    //admin_update_employee();
    //admin_update_job();
    admin_update_job_list();
    ui->admin_employee_list_table->setEditTriggers(QAbstractItemView::DoubleClicked);
    ui->admin_project_list_table->setEditTriggers(QAbstractItemView::DoubleClicked);


}
void MainWindow::admin_update_calendar()
{
    if(ui->admin_calendar->selectedDate().dayOfWeek()==7)
    {
        ui->admin_calendar_begin->setDate(QDate::currentDate().addDays(0));
        ui->admin_calendar_end->setDate(QDate::currentDate().addDays(6));
    }
    else
    {
        ui->admin_calendar_begin->setDate(ui->admin_calendar->selectedDate().addDays(-(ui->admin_calendar->selectedDate().dayOfWeek())));
        ui->admin_calendar_end->setDate(ui->admin_calendar->selectedDate().addDays(6-(ui->admin_calendar->selectedDate().dayOfWeek())));
    }

    QTime x(0,0,0,0);
    QTime y(23,59,59,0);
    ui->admin_calendar_begin->setTime(x);
    ui->admin_calendar_end->setTime(y);
    ui->admin_employee_table->clear();
    admin_update_employee();
}

//Calendar
void MainWindow::on_admin_calendar_clicked(const QDate &date)
{
    admin_update_calendar();
    QDate x =date;
    x.addDays(1);
}

//Employee List
void MainWindow::admin_update_employee_list()
{
    QSqlQuery qry(employeeDataBase);
    qry.prepare("SELECT name,pin,adminstatus,wage,id FROM employeelist");
    QString a,b,c,d,e;


    ui->admin_employee_list_table->clearContents();
    ui->admin_employee_list_table->setRowCount(0);
    ui->admin_employee_list_table->setColumnCount(5);
    ui->admin_employee_list_table->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    ui->admin_employee_list_table->setHorizontalHeaderItem(1,new QTableWidgetItem("Pin"));
    ui->admin_employee_list_table->setHorizontalHeaderItem(2,new QTableWidgetItem("Admin Status"));
    ui->admin_employee_list_table->setHorizontalHeaderItem(3,new QTableWidgetItem("Wage"));
    ui->admin_employee_list_table->setHorizontalHeaderItem(4,new QTableWidgetItem("ID"));
    for (int c = 0; c < ui->admin_employee_list_table->horizontalHeader()->count(); ++c)
    {
        ui->admin_employee_list_table->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    ui->admin_employee_list_table->setShowGrid(false);
    ui->admin_employee_list_table->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->admin_employee_list_table->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->admin_employee_list_table->verticalHeader()->hide();
    if(qry.exec())
    {
        while(qry.next())
        {
            ui->admin_employee_list_table->setRowCount(ui->admin_employee_list_table->rowCount()+1);
            a = qry.value(0).toString();
            b = qry.value(1).toString();
            c = qry.value(2).toString();
            d = qry.value(3).toString();
            e = qry.value(4).toString();
            QTableWidgetItem *x = new QTableWidgetItem(a);
            x->setFlags(Qt::ItemIsEditable|Qt::ItemIsSelectable|Qt::ItemIsEnabled);
            ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,0,x);
            ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,1,new QTableWidgetItem(b));
            ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,2,new QTableWidgetItem(c));
            ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,3,new QTableWidgetItem(d));
            ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,4,new QTableWidgetItem(e));
            //current_row++;
        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee list " +qry.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    /* This stuff isn't needed for now because I am adjusting this information on the Employee_page
    ui->admin_employee_list_table->setRowCount(ui->admin_employee_list_table->rowCount()+1);
    ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,0,new QTableWidgetItem("~Name"));
    ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,1,new QTableWidgetItem("~ID"));
    ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,2,new QTableWidgetItem("~Admin Status"));
    ui->admin_employee_list_table->setItem(ui->admin_employee_list_table->rowCount()-1,3,new QTableWidgetItem("~Wage"));
    */
    ui->admin_employee_list_table->resizeColumnsToContents();
}
/*void MainWindow::on_admin_employee_list_table_cellPressed(int row, int column)
{
    column=column;
    ui->admin_employee_table->clear();
    QString lul=ui->admin_employee_list_table->item(row,1)->text();
    QSqlQuery qry(employeeDataBase);
    qry.prepare("SELECT id FROM employeelist WHERE pin = '"+lul+"'");
    if(qry.exec())
    {
        while(qry.next())
        {
            selected_id = qry.value(0).toString();
        }
    }
    admin_update_employee();
}*/
void MainWindow::on_admin_employee_list_table_pressed(const QModelIndex &index)
{

    employeePage_initialize();
}
void MainWindow::on_admin_el_add_clicked()
{

    QSqlQuery qry(employeeDataBase), qry1(employeeDataBase);
    QString x;
    int y;
    qry1.prepare("SELECT id FROM employeelist ORDER BY id DESC LIMIT 1");
    if (qry1.exec())
    {
        while(qry1.next())
        {
            x=qry1.value(0).toString();
            y=x.toInt();
            y++;
            x=QString::number(y);
        }
    }
    else
    {
        QString x = "Error(findid)::" +qry1.lastError().text();
    }
    QString name,ID,adminstatus,wage;
    int rowcount = ui->admin_employee_list_table->rowCount();
    name = ui->admin_employee_list_table->item(rowcount-1,0)->text();
    ID = ui->admin_employee_list_table->item(rowcount-1,1)->text();
    adminstatus = ui->admin_employee_list_table->item(rowcount-1,2)->text();
    wage = ui->admin_employee_list_table->item(rowcount-1,3)->text();

    qry.prepare("insert into employeelist(name,pin,adminstatus,wage,shiftcount,active,id)  values('"+name+"','"+ID+"','"+adminstatus+"','"+wage+"',0,0,'"+x+"')");
    if (qry.exec())
    {
        ui->statusBar->showMessage("Successfully Added");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else
    {
        QString x = "Error::" +qry.lastError().text();
    }

    QSqlQuery qry2(employeeDataBase);
    //This statement creates a table named after the employee's id which holds their clockin and clockout times.

    qry2.exec("CREATE TABLE '"+x+"'"
               "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR, mobilization VARCHAR,one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");

    admin_update_tables();
}
void MainWindow::on_admin_el_del_clicked()
{
    QSqlQuery qry(employeeDataBase);
    qry.prepare("DROP TABLE '"+selected_id+"'");

    if (qry.exec())
    {
        ui->statusBar->showMessage("Successfully Deleted");
        Sleep(1000);
        ui->statusBar->showMessage("");

    }

    qry.clear();
    qry.prepare("delete from employeelist where id='"+selected_id+"'");
    qry.exec();
    admin_update_tables();
}
void MainWindow::on_admin_el_save_clicked()
{
    for(int i = 0; i<ui->admin_employee_list_table->rowCount()-1;i++)
    {
        QString name = ui->admin_employee_list_table->item(i,0)->text();
        QString pin = ui->admin_employee_list_table->item(i,1)->text();
        QString adminstatus = ui->admin_employee_list_table->item(i,2)->text();
        QString wage = ui->admin_employee_list_table->item(i,3)->text();
        QString ID = ui->admin_employee_list_table->item(i,4)->text();
        QSqlQuery qry(employeeDataBase);
        qry.prepare("update employeelist set name='"+name+"',pin = '"+pin+"',adminstatus = '"+adminstatus+"',wage = '"+wage+"' where id='"+ID+"'");
        qry.exec();
        qry.clear();
    }
    admin_update_tables();
}

//Employee
void MainWindow::admin_update_employee()
{
    QString x = ui->admin_calendar_begin->dateTime().toString("yyyy-MM-dd HH:mm:ss");
    QString y = ui->admin_calendar_end->dateTime().toString("yyyy-MM-dd HH:mm:ss");
    //qDebug()<<selected_id;
    QSqlQuery qry(employeeDataBase);
    qry.prepare("SELECT clockin,clockout,lunch FROM '"+selected_id+"' where clockin >'"+x+"' and clockin <'"+y+"'");
    QString a,b,c,d,e,f,g;

    int j=0,k=0;
    int current_row = 0;

    ui->admin_employee_table->setColumnCount(5);
    ui->admin_employee_table->setHorizontalHeaderItem(0,new QTableWidgetItem("Date"));
    ui->admin_employee_table->setHorizontalHeaderItem(1,new QTableWidgetItem("Clock In"));
    ui->admin_employee_table->setHorizontalHeaderItem(2,new QTableWidgetItem("Clock Out"));
    ui->admin_employee_table->setHorizontalHeaderItem(3,new QTableWidgetItem("Length"));
    ui->admin_employee_table->setHorizontalHeaderItem(4,new QTableWidgetItem("Lunch Length"));
    for (int c = 0; c < ui->admin_employee_table->horizontalHeader()->count(); ++c)
    {
        ui->admin_employee_table->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    ui->admin_employee_table->setShowGrid(false);
    ui->admin_employee_table->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->admin_employee_table->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->admin_employee_table->verticalHeader()->hide();
    if(qry.exec())
    {
        while(qry.next())
        {

            ui->admin_employee_table->setRowCount(current_row+1);
            a = qry.value(0).toString();
            b = qry.value(1).toString();

            QDateTime date1 = QDateTime::fromString(a,"yyyy-MM-dd HH:mm:ss");
            QDateTime date2 = QDateTime::fromString(b,"yyyy-MM-dd HH:mm:ss");

            c = DateSyntax("date",date1);
            d = DateSyntax("time",date1);
            e = DateSyntax("time",date2);

            g = qry.value(2).toString();
            int lunchLength = (g.toInt())*60;

            int secs = date1.secsTo(date2)-lunchLength;
            int hours = secs/3600;
            int minutes = secs%3600/60;

            if(minutes==0)
                f = QString::number(hours)+":"+QString::number(minutes)+"0";
            else
                f = QString::number(hours)+":"+QString::number(minutes);




            j+=hours;
            k+=minutes;

            ui->admin_employee_table->setItem(current_row,0,new QTableWidgetItem(c));
            ui->admin_employee_table->setItem(current_row,1,new QTableWidgetItem(d));
            ui->admin_employee_table->setItem(current_row,2,new QTableWidgetItem(e));

            ui->admin_employee_table->setItem(current_row,3,new QTableWidgetItem(f));

            ui->admin_employee_table->setItem(current_row,4,new QTableWidgetItem(g));
            current_row++;
        }


    }

    else
    {
        ui->statusBar->showMessage("Error:: employee " +qry.lastError().text());
        //Sleep(1000);
        ui->statusBar->showMessage("");
    }
    ui->admin_employee_table->resizeColumnsToContents();
    j+=k/60;
    k=k%60;

    QSqlQuery qryWage(employeeDataBase);
    qryWage.prepare("SELECT wage FROM employeelist where id='"+selected_id+"'");
    double weeklyWage = 0.0;
    QString  wageString;
    if(qryWage.exec())
    {
        while(qryWage.next())
        {
            wageString = qryWage.value(0).toString();
            double wage = wageString.toDouble();
            weeklyWage+=j*wage;
            weeklyWage+=k*(wage/60);


        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee wage " +qryWage.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }

    if(k==0)
        ui->admin_employee_time->setText("Hours Worked: " +QString::number(j)+":"+QString::number(k)+"0");
    else
        ui->admin_employee_time->setText("Hours Worked: " +QString::number(j)+":"+QString::number(k));



    ui->admin_employee_wage->setText("Weekly Wage: $"+QString::number(weeklyWage,'f',2));

}

//Job List
void MainWindow::admin_update_job_list()
{


    QSqlQuery qry(projectDataBase);
    QString active ="1";
    qry.prepare("SELECT name,id FROM projectlist where active='"+active+"'");
    QString a,b;

    ui->admin_project_list_table->clearContents();
    ui->admin_project_list_table->setRowCount(0);
    ui->admin_project_list_table->setColumnCount(4);
    ui->admin_project_list_table->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    ui->admin_project_list_table->setHorizontalHeaderItem(1,new QTableWidgetItem("ID"));
    ui->admin_project_list_table->setHorizontalHeaderItem(2,new QTableWidgetItem("Est. Time"));
    ui->admin_project_list_table->setHorizontalHeaderItem(3,new QTableWidgetItem("Est. Cost"));

    ui->admin_project_list_table->setShowGrid(false);
    ui->admin_project_list_table->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->admin_project_list_table->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->admin_project_list_table->verticalHeader()->hide();

    if(qry.exec())
    {
        while(qry.next())
        {
            ui->admin_project_list_table->setRowCount(ui->admin_project_list_table->rowCount()+1);
            a = qry.value(0).toString();
            //qDebug()<<a;
            b = qry.value(1).toString();

            QTableWidgetItem *x = new QTableWidgetItem(a);
            x->setFlags(Qt::ItemIsEditable|Qt::ItemIsSelectable|Qt::ItemIsEnabled);
            ui->admin_project_list_table->setItem(ui->admin_project_list_table->rowCount()-1,0,x);
            ui->admin_project_list_table->setItem(ui->admin_project_list_table->rowCount()-1,1,new QTableWidgetItem(b));
            //current_row++;
        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: project list " +qry.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    QSqlQuery qry2(projectDataBase),qry3(projectDataBase);

    for(int x=0; x <ui->admin_project_list_table->rowCount();x++)
    {
        int u=0,i=0;
        double o=0.0;
        QString thisId = ui->admin_project_list_table->item(x,1)->text();
        //qDebug()<<thisId;
        qry2.prepare("SELECT length,cost FROM '"+thisId+"'");
        if(qry2.exec())
        {
            while(qry2.next())
            {
                QString a = qry2.value(0).toString();
                u+=a.split(":")[0].toInt();
                i+=a.split(":")[1].toInt();
                double b = qry2.value(1).toDouble();
                o+=b;
            }
        }
        QString length= QString::number(u)+":"+QString::number(i);
        if(QString::number(i)=="0")
        {
            length+="0";
        }
        ui->admin_project_list_table->setItem(x,2,new QTableWidgetItem(length));
        ui->admin_project_list_table->setItem(x,3,new QTableWidgetItem(QString::number(o,'f',2)));
    }





    /* HELPFUL IF YOU WANT YOUR CONTENT TO SPAN BOX
     *
    for (int c = 0; c < ui->admin_project_list_table->horizontalHeader()->count(); ++c)
    {
        ui->admin_project_list_table->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }*/

    ui->admin_project_list_table->resizeColumnsToContents();
    /* This is helpful but since I am editing it on the employee page I dont need it anymore
    ui->admin_project_list_table->setRowCount(ui->admin_project_list_table->rowCount()+1);
    ui->admin_project_list_table->setItem(ui->admin_project_list_table->rowCount()-1,0,new QTableWidgetItem("~Name"));
    ui->admin_project_list_table->setItem(ui->admin_project_list_table->rowCount()-1,1,new QTableWidgetItem("~ID"));
    */


}
/*void MainWindow::on_admin_project_list_table_cellClicked(int row, int column)
{
    column=column;
    ui->admin_project_table->clear();
    selected_pl_id = ui->admin_project_list_table->item(row,1)->text();
    admin_update_job();
}*/
void MainWindow::on_admin_project_list_table_pressed(const QModelIndex &index)
{
    projectPage_initialize();
}


void MainWindow::on_admin_pl_add_clicked()
{
    QSqlQuery qry(projectDataBase), qry1(projectDataBase);
    QString x;
    int y;

    qry1.prepare("SELECT id FROM projectlist ORDER BY id DESC LIMIT 1");
    if (qry1.exec())
    {
        while(qry1.next())
        {
            x=qry1.value(0).toString();

            y=x.toInt();
            y++;
            x=QString::number(y);
        }
    }
    else {
        ui->statusBar->showMessage("Error:: finding new id " +qry1.lastError().text());
        qDebug()<<"Error:: finding new id " +qry1.lastError().text();
        Sleep(1000);
        ui->statusBar->showMessage("");
    }


    int rowcount = ui->admin_project_list_table->rowCount();
    QString name = ui->admin_project_list_table->item(rowcount-1,0)->text();




    qry.prepare("insert into projectlist(name,active,id)  values('"+name+"',1,'"+x+"')");
    if (qry.exec())
    {
        ui->statusBar->showMessage("Successfully Added");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else {
        ui->statusBar->showMessage("Error:: error adding new job to projectlist " +qry.lastError().text());
        qDebug()<<"Error:: error adding new job to projectlist " +qry.lastError().text();
        Sleep(1000);
        ui->statusBar->showMessage("");
    }

    QSqlQuery qry2(projectDataBase);

    qry2.exec("CREATE TABLE '"+x+"'"
               "(name VARCHAR, length VARCHAR, cost VARCHAR, id VARCHAR)");
    admin_update_tables();
}
void MainWindow::on_admin_pl_save_clicked()
{
    for(int i = 0; i<ui->admin_project_list_table->rowCount()-1;i++)
    {
        QString name = ui->admin_project_list_table->item(i,0)->text();
        QString ID = ui->admin_project_list_table->item(i,1)->text();

        QSqlQuery qry(projectDataBase);
        qry.prepare("update projectlist set name='"+name+"' where id='"+ID+"'");
        qry.exec();
        qry.clear();
    }
    admin_update_tables();
}
void MainWindow::on_admin_pl_del_clicked()
{
    QSqlQuery qry(projectDataBase);
    qry.prepare("delete from projectlist where id='"+selected_pl_id+"'");
    if (qry.exec())
    {
        ui->statusBar->showMessage("Successfully Deleted");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    qry.clear();
    qry.prepare("DROP TABLE '"+selected_pl_id+"'");
    qry.exec();


    admin_update_tables();
}
void MainWindow::on_admin_pl_arc_clicked()
{
    QSqlQuery qry(projectDataBase);
    qry.prepare("update projectlist set active='0' where id = '"+selected_pl_id+"'");
    if(qry.exec())
    {
        ui->statusBar->showMessage("Successfully Archived");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    admin_update_tables();
}
//Job
void MainWindow::admin_update_job()
{
    QSqlQuery qry(projectDataBase);
    qry.prepare("SELECT name,length,cost FROM '"+selected_pl_id+"'");

    ui->admin_project_table->setColumnCount(3);
    ui->admin_project_table->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    ui->admin_project_table->setHorizontalHeaderItem(1,new QTableWidgetItem("Est. Time"));
    ui->admin_project_table->setHorizontalHeaderItem(2,new QTableWidgetItem("Est. Cost"));
    for (int c = 0; c < ui->admin_project_table->horizontalHeader()->count(); ++c)
    {
        ui->admin_project_table->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    int j=0,k=0;
    QString a,b;
    double c;
    int current_row = 0;
    ui->admin_project_table->setShowGrid(false);
    ui->admin_project_table->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->admin_project_table->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->admin_project_table->verticalHeader()->hide();
    if(qry.exec())
    {
        int novalue = 0;
        while(qry.next())
        {
            //qDebug()<<"IM here";
            ui->admin_project_table->setRowCount(current_row+1);
            a = qry.value(0).toString();

            b = qry.value(1).toString();
            int hour = b.split(":")[0].toInt();
            int minute = b.split(":")[1].toInt();
            if(hour!=-1)
                j+=hour;
            if(minute!=-1)
                k+=minute;
            c = qry.value(2).toDouble();

            ui->admin_project_table->setItem(current_row,0,new QTableWidgetItem(a));
            ui->admin_project_table->setItem(current_row,1,new QTableWidgetItem(b));
            ui->admin_project_table->setItem(current_row,2,new QTableWidgetItem(QString::number(c,'f',2)));
            novalue=1;
            current_row++;

        }
        //This whole  novalue thing is for if the table is empty. It was crashing a bunch and
        //this is something I found that fixed it when in that condition.
        if(novalue==0)
        {

            ui->admin_project_table->setRowCount(ui->admin_project_table->rowCount()-1);

        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee " +qry.lastError().text());
        //Sleep(1000);
        ui->statusBar->showMessage("");
    }

    j+=k/60;
    k=k%60;
    ui->admin_project_time->hide();
    /*if(k==0)
        ui->admin_project_time->setText("Total Project Time: " +QString::number(j)+":"+QString::number(k)+"0");
    else
        ui->admin_project_time->setText("Total Project Time: " +QString::number(j)+":"+QString::number(k));*/
    admin_update_project_combo();
    admin_update_project_combo2();
    admin_update_project_combo3();
}
void MainWindow::admin_update_project_combo()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select DISTINCT cate from itemlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->admin_p_combo->setModel(modal);

}
void MainWindow::admin_update_project_combo2()
{
    QString x = ui->admin_p_combo->currentText();
    QSqlQueryModel * modal2=new QSqlQueryModel();
    QSqlQuery* qry2=new QSqlQuery(projectDataBase);
    qry2->prepare("select DISTINCT sub from itemlist where cate='"+x+"'");
    qry2->exec();
    modal2->setQuery(*qry2);
    ui->admin_p_combo2->setModel(modal2);

}
void MainWindow::admin_update_project_combo3()
{
    QString x = ui->admin_p_combo2->currentText();
    QSqlQueryModel * modal3=new QSqlQueryModel();
    QSqlQuery* qry2=new QSqlQuery(projectDataBase);
    qry2->prepare("select dim from itemlist where sub='"+x+"'");
    qry2->exec();
    modal3->setQuery(*qry2);
    ui->admin_p_combo3->setModel(modal3);

}
void MainWindow::on_admin_p_combo_currentIndexChanged(const QString &arg1)
{
    admin_update_project_combo2();
    QString x = arg1;
}
void MainWindow::on_admin_p_combo2_currentIndexChanged(const QString &arg1)
{
    admin_update_project_combo3();
    QString x = arg1;
}
void MainWindow::on_admin_p_add_clicked()
{
    QString cate = ui->admin_p_combo->currentText();
    QString sub = ui->admin_p_combo2->currentText();
    QString dim = ui->admin_p_combo3->currentText();
    QSqlQuery qry(projectDataBase), qry1(projectDataBase);
    QString x = "0:00";
    QString y = "0";
    QString composite;
    if(sub=="Na"&&dim=="Na")
    {
        composite = cate;
    }
    else if (dim=="Na")
    {
        composite = cate+" "+sub;
    }
    else
    {
        composite = cate+" "+sub+" "+dim;
    }


    QString id;
    qry1.prepare("Select id from itemlist where cate='"+cate+"' and sub='"+sub+"' and dim='"+dim+"'");
    if(qry1.exec())
    {
        while(qry1.next())
        {
            id = qry1.value(0).toString();
        }
    }
    qry1.clear();
    QString checker;
    qDebug()<<checker;
    qry1.prepare("Select name from '"+selected_pl_id+"' where id='"+id+"'");
    if(qry1.exec())
    {
        while(qry1.next())
        {
            checker= qry1.value(0).toString();
        }
    }
    qDebug()<<checker;


    if(checker=="")
    {
        qry.prepare("insert into '"+selected_pl_id+"'(name,length,cost,id) values('"+composite+"','"+x+"','"+y+"','"+id+"')");
        qry.exec();
        ui->statusBar->showMessage("Successfully added");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else
    {
        ui->statusBar->showMessage("Error: You already have this item.");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }





    admin_update_tables();
}
void MainWindow::on_admin_p_del_clicked()
{

    QSqlQuery qry(projectDataBase);
    qry.prepare("DELETE FROM '"+selected_pl_id+"' WHERE name='"+selected_item+"'");
    qry.exec();
    admin_update_job();

}
void MainWindow::on_admin_project_table_cellClicked(int row, int column)
{
    column=column;

    selected_item = ui->admin_project_table->item(row,0)->text();
}











//Employee Classes
void MainWindow::on_employee_finished_clicked()
{
    ui->stackedWidget->setCurrentIndex(0);
    ui->login_edit->clear();
    ui->login_label_status->setText("");
}
void MainWindow::on_employee_clockin_clicked()
{
    QSqlQuery qry(employeeDataBase),qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase),qry4(employeeDataBase);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE id = '"+id+"'");
    if(qry.exec())
    {

        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    if(active == "1")
    {
        ui->statusBar->showMessage("Already Clocked In");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(active== "0")
    {
        QDateTime x = QDateTime::currentDateTime();
        QDateTime z =format_datetimes(x);

        QString time = z.toString("yyyy-MM-dd HH:mm:ss");


        qry1.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");

        QString shiftcount;
        if(qry1.exec())
        {

            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }

        int shiftcountInt = shiftcount.toInt();
        shiftcountInt++;
        shiftcount = QString::number(shiftcountInt);

        // Inserting clockin time and shiftnumber into pin.
        qry4.prepare("insert into '"+id+"'(clockin,shiftnumber) values('"+time+"','"+shiftcount+"')");
        if (qry4.exec())
        {

            // Setting active.
            qry2.prepare("update employeelist set active=1 where id = '"+id+"'");
            qry2.exec();
            // Setting employeelist shiftcount.
            qry3.prepare("update employeelist set shiftcount = '"+shiftcount+"' where id = '"+id+"'");
            qry3.exec();
            ui->statusBar->showMessage("Successfully Clocked In");
            Sleep(1000);
            ui->statusBar->showMessage("");

        }
        else
        {
            ui->statusBar->showMessage("Error4::" +qry4.lastError().text());
            Sleep(1000);
            ui->statusBar->showMessage("");
        }
    }
   employee_update_tables();

}
void MainWindow::on_employee_clockout_clicked()
{
    QSqlQuery qry(employeeDataBase);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE pin = '"+pin+"'");
    if(qry.exec())
    {

        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    if(active == "0")
    {
        ui->statusBar->showMessage("Already Clocked Out");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(active== "1")
    {
       clockout_initialize();
    }

}

void MainWindow::employee_initialize()
{
    ui->stackedWidget->setCurrentIndex(2);
    ui->employee_calendar->setSelectedDate(QDate::currentDate());
    employee_update_calendar();
    selected_id = id;

}
void MainWindow::employee_update_calendar()
{

    if(ui->employee_calendar->selectedDate().dayOfWeek()==7)
    {
        ui->employee_calendar_begin->setDate(QDate::currentDate().addDays(0));
        ui->employee_calendar_end->setDate(QDate::currentDate().addDays(6));
    }
    else
    {
        ui->employee_calendar_begin->setDate(ui->employee_calendar->selectedDate().addDays(-(ui->employee_calendar->selectedDate().dayOfWeek())));
        ui->employee_calendar_end->setDate(ui->employee_calendar->selectedDate().addDays(6-(ui->employee_calendar->selectedDate().dayOfWeek())));
    }

    QTime x(0,0,0,0);
    QTime y(23,59,59,0);
    ui->employee_calendar_begin->setTime(x);
    ui->employee_calendar_end->setTime(y);
    ui->employee_employee_table->clear();

    employee_update_employee();
}
void MainWindow::employee_update_tables()
{
    employee_update_employee();
}
void MainWindow::employee_update_employee()
{
    QString x = ui->employee_calendar_begin->dateTime().toString("yyyy-MM-dd HH:mm:ss");
    QString y = ui->employee_calendar_end->dateTime().toString("yyyy-MM-dd HH:mm:ss");
    //qDebug()<<selected_id;
    QSqlQuery qry(employeeDataBase);
    qry.prepare("SELECT clockin,clockout,lunch FROM '"+selected_id+"' where clockin >'"+x+"' and clockin <'"+y+"'");
    QString a,b,c,d,e,f,g;

    int j=0,k=0;
    int current_row = 0;

    ui->employee_employee_table->setColumnCount(5);
    ui->employee_employee_table->setHorizontalHeaderItem(0,new QTableWidgetItem("Date"));
    ui->employee_employee_table->setHorizontalHeaderItem(1,new QTableWidgetItem("Clock In"));
    ui->employee_employee_table->setHorizontalHeaderItem(2,new QTableWidgetItem("Clock Out"));
    ui->employee_employee_table->setHorizontalHeaderItem(3,new QTableWidgetItem("Length"));
    ui->employee_employee_table->setHorizontalHeaderItem(4,new QTableWidgetItem("Lunch Length"));
    for (int c = 0; c < ui->employee_employee_table->horizontalHeader()->count(); ++c)
    {
        ui->employee_employee_table->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    ui->employee_employee_table->setShowGrid(false);
    ui->employee_employee_table->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->employee_employee_table->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->employee_employee_table->verticalHeader()->hide();





    if(qry.exec())
    {
        while(qry.next())
        {

            ui->employee_employee_table->setRowCount(current_row+1);
            a = qry.value(0).toString();
            b = qry.value(1).toString();

            QDateTime date1 = QDateTime::fromString(a,"yyyy-MM-dd HH:mm:ss");
            QDateTime date2 = QDateTime::fromString(b,"yyyy-MM-dd HH:mm:ss");

            c = DateSyntax("date",date1);
            d = DateSyntax("time",date1);
            e = DateSyntax("time",date2);


            g = qry.value(2).toString();
            int lunchLength = (g.toInt())*60;

            int secs = date1.secsTo(date2)-lunchLength;
            int hours = secs/3600;
            int minutes = secs%3600/60;
            f = QString::number(hours)+":"+QString::number(minutes);


            j+=hours;
            k+=minutes;

            ui->employee_employee_table->setItem(current_row,0,new QTableWidgetItem(c));
            ui->employee_employee_table->setItem(current_row,1,new QTableWidgetItem(d));
            ui->employee_employee_table->setItem(current_row,2,new QTableWidgetItem(e));


            ui->employee_employee_table->setItem(current_row,3,new QTableWidgetItem(f));

            ui->employee_employee_table->setItem(current_row,4,new QTableWidgetItem(g));
            current_row++;
        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee " +qry.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }

    ui->employee_employee_table->resizeColumnsToContents();
    j+=k/60;
    k=k%60;

    QSqlQuery qryWage(employeeDataBase);
    qryWage.prepare("SELECT wage FROM employeelist where id='"+selected_id+"'");
    double weeklyWage = 0.0;
    QString  wageString;
    if(qryWage.exec())
    {
        while(qryWage.next())
        {
            wageString = qryWage.value(0).toString();
            double wage = wageString.toDouble();
            weeklyWage+=j*wage;
            weeklyWage+=k*(wage/60);


        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee wage " +qryWage.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }

    if(k==0)
        ui->employee_employee_time->setText("Hours Worked: " +QString::number(j)+":"+QString::number(k)+"0");
    else
        ui->employee_employee_time->setText("Hours Worked: " +QString::number(j)+":"+QString::number(k));


    ui->employee_employee_wage->setText("Weekly Wage: $"+QString::number(weeklyWage,'f',2));

}

//Calendar
void MainWindow::on_employee_calendar_clicked(const QDate &date)
{
    employee_update_calendar();
    QDate x =date;
    x.addDays(1);
}



//Analyze Classes

void MainWindow::analyze_initialize()
{
    analyze_update_project_list_combo();
    analyze_update_project_combo();

}
void MainWindow::analyze_update_times_table()
{

    ui->analyze_times_table->clearContents();
    ui->analyze_times_table->setRowCount(0);
    ui->analyze_times_table->setColumnCount(1);
    ui->analyze_times_table->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    for (int c = 0; c < ui->analyze_times_table->horizontalHeader()->count(); ++c)
    {
        ui->analyze_times_table->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    ui->analyze_times_table->setShowGrid(false);
    ui->analyze_times_table->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->analyze_times_table->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->analyze_times_table->verticalHeader()->hide();

    QSqlQuery qry(employeeDataBase),qry1(employeeDataBase);
    QString id,name;
    QString pid,iid,hour,minute;





















    QString one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve;
    qry.prepare("select id from employeelist");
    if(qry.exec())
    {
        while(qry.next())
        {
            id = qry.value(0).toString();
            qry1.prepare("select name from employeelist where id='"+id+"'");
            if(qry1.exec())
            {
                while(qry1.next()){
                    name= qry1.value(0).toString();
                }
            }
            qry1.clear();

            qry1.prepare("select one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve from '"+id+"'");
            if(qry1.exec())
            {
                while(qry1.next())
                {
                    one = qry1.value(0).toString();
                    two = qry1.value(1).toString();
                    three = qry1.value(2).toString();
                    four = qry1.value(3).toString();
                    five = qry1.value(4).toString();
                    six = qry1.value(5).toString();
                    seven = qry1.value(6).toString();
                    eight = qry1.value(7).toString();
                    nine = qry1.value(8).toString();
                    ten = qry1.value(9).toString();
                    eleven = qry1.value(10).toString();
                    twelve = qry1.value(11).toString();
                    QString nah = "Na";
                    if(one!=nah)
                    {
                        if(one != "")
                        {
                            pid = QString::number(one.split(",")[0].toInt());

                            iid = QString::number(one.split(",")[1].toInt());
                            hour = QString::number(one.split(",")[2].toInt());
                            minute = QString::number(one.split(",")[3].toInt());


                            if(pid == analyze_project_id)
                            {
                                if(iid == analyze_item_id)
                                {
                                    ui->analyze_times_table->setRowCount(ui->analyze_times_table->rowCount()+1);
                                    qDebug()<<pid<<iid<<hour<<minute<<name;
                                    QTableWidgetItem *x = new QTableWidgetItem(name+"~"+hour+":"+minute);
                                    x->setFlags(Qt::ItemIsEditable|Qt::ItemIsSelectable|Qt::ItemIsEnabled);
                                    ui->analyze_times_table->setItem(ui->analyze_times_table->rowCount()-1,0,x);



                                }

                            }
                        }

                    }



                }

            }

        }
    }
}
void MainWindow::on_pushButton_clicked()
{
    admin_initialize();
}




void MainWindow::analyze_update_project_list_combo()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->analyze_project_list_combo->setModel(modal);
}
void MainWindow::analyze_update_project_combo()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    QString name = ui->analyze_project_list_combo->currentText();
    QSqlQuery qry1(projectDataBase);
    QString id;
    qry1.prepare("select id from projectlist where name='"+name+"'");
    if(qry1.exec())
    {
        while(qry1.next())
        {
            id = qry1.value(0).toString();
        }
    }
    qry->prepare("select name from '"+id+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->analyze_project_combo->setModel(modal);

    QSqlQuery qry2(projectDataBase);

    qry2.prepare("select id from projectlist where name='"+name+"'");
    if(qry2.exec())
    {
        while(qry2.next())
        {
            analyze_project_id = qry2.value(0).toString();
        }
    }
}
void MainWindow::on_analyze_project_list_combo_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    ui->analyze_times_table->clearContents();
    analyze_update_project_combo();
}
void MainWindow::on_analyze_project_combo_currentIndexChanged(const QString &arg1)
{
    ui->analyze_times_table->clearContents();
    QString x =arg1;
    QString name = ui->analyze_project_combo->currentText();
    QSqlQuery qry(projectDataBase);
    qry.prepare("select id from '"+analyze_project_id+"' where name='"+name+"'");
    if(qry.exec())
    {
        while(qry.next())
        {
            analyze_item_id=qry.value(0).toString();
            analyze_update_times_table();
        }
    }
}


//EmployeePage
void MainWindow::employeePage_initialize()
{
    ui->stackedWidget->setCurrentIndex(6);
    ui->Employee_page_table1->setContextMenuPolicy(Qt::CustomContextMenu);
    connect(ui->Employee_page_table1,SIGNAL(customContextMenuRequested(const QPoint&)),this,SLOT(ShowContextMenuEmployee1(const QPoint&)));
    ui->Employee_page_table2->setContextMenuPolicy(Qt::CustomContextMenu);
    connect(ui->Employee_page_table2,SIGNAL(customContextMenuRequested(const QPoint&)),this,SLOT(ShowContextMenuEmployee2(const QPoint&)));
   

    update_employeePage_tables();



}
void MainWindow::update_employeePage_tables()
{
    update_employee_page_table1();
    update_employee_page_table2();
}
void MainWindow::update_employee_page_table1()
{
    QSqlQuery qry(employeeDataBase);
    qry.prepare("SELECT name,pin,adminstatus,wage,id FROM employeelist");
    QString a,b,c,d,e;


    ui->Employee_page_table1->clearContents();
    ui->Employee_page_table1->setRowCount(0);
    ui->Employee_page_table1->setColumnCount(5);
    ui->Employee_page_table1->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    ui->Employee_page_table1->setHorizontalHeaderItem(1,new QTableWidgetItem("Pin"));
    ui->Employee_page_table1->setHorizontalHeaderItem(2,new QTableWidgetItem("Admin Status"));
    ui->Employee_page_table1->setHorizontalHeaderItem(3,new QTableWidgetItem("Wage"));
    ui->Employee_page_table1->setHorizontalHeaderItem(4,new QTableWidgetItem("ID"));
    for (int c = 0; c < ui->Employee_page_table1->horizontalHeader()->count(); ++c)
    {
        ui->Employee_page_table1->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    ui->Employee_page_table1->setShowGrid(false);
    ui->Employee_page_table1->setEditTriggers(QAbstractItemView::DoubleClicked);
    ui->Employee_page_table1->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->Employee_page_table1->verticalHeader()->hide();
    if(qry.exec())
    {
        while(qry.next())
        {
            ui->Employee_page_table1->setRowCount(ui->Employee_page_table1->rowCount()+1);
            a = qry.value(0).toString();
            b = qry.value(1).toString();
            c = qry.value(2).toString();
            d = qry.value(3).toString();
            e = qry.value(4).toString();
            QTableWidgetItem *x = new QTableWidgetItem(a);
            x->setFlags(Qt::ItemIsEditable|Qt::ItemIsSelectable|Qt::ItemIsEnabled);
            ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,0,x);
            ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,1,new QTableWidgetItem(b));
            ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,2,new QTableWidgetItem(c));
            ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,3,new QTableWidgetItem(d));
            ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,4,new QTableWidgetItem(e));
            //current_row++;
        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee list " +qry.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }

    ui->Employee_page_table1->setRowCount(ui->Employee_page_table1->rowCount()+1);
    ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,0,new QTableWidgetItem("~Name"));
    ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,1,new QTableWidgetItem("~ID"));
    ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,2,new QTableWidgetItem("~Admin Status"));
    ui->Employee_page_table1->setItem(ui->Employee_page_table1->rowCount()-1,3,new QTableWidgetItem("~Wage"));
    
    //ui->Employee_page_table1->horizontalHeaderItem(0)->

}
void MainWindow::update_employee_page_table2()
{
    QString x = ui->admin_calendar_begin->dateTime().toString("yyyy-MM-dd HH:mm:ss");
    QString y = ui->admin_calendar_end->dateTime().toString("yyyy-MM-dd HH:mm:ss");
    //qDebug()<<selected_id<<x<<y;
    QSqlQuery qry(employeeDataBase);

    qry.prepare("SELECT clockin,clockout,lunch,shiftnumber FROM '"+selected_id+"'");// where clockin >'"+x+"' and clockin <'"+y+"'");
    QString a,b,c,d,e,f,g,h;

    int j=0,k=0;
    int current_row = 0;

    ui->Employee_page_table2->setColumnCount(6);
    ui->Employee_page_table2->setHorizontalHeaderItem(0,new QTableWidgetItem("Date"));
    ui->Employee_page_table2->setHorizontalHeaderItem(1,new QTableWidgetItem("Clock In"));
    ui->Employee_page_table2->setHorizontalHeaderItem(2,new QTableWidgetItem("Clock Out"));
    ui->Employee_page_table2->setHorizontalHeaderItem(3,new QTableWidgetItem("Length"));
    ui->Employee_page_table2->setHorizontalHeaderItem(4,new QTableWidgetItem("Lunch Length"));
    ui->Employee_page_table2->setHorizontalHeaderItem(5,new QTableWidgetItem("ID"));
    for (int c = 0; c < ui->Employee_page_table2->horizontalHeader()->count(); ++c)
    {
        ui->Employee_page_table2->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    ui->Employee_page_table2->setShowGrid(false);
    ui->Employee_page_table2->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->Employee_page_table2->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->Employee_page_table2->verticalHeader()->hide();
    if(qry.exec())
    {
        while(qry.next())
        {

            ui->Employee_page_table2->setRowCount(current_row+1);
            a = qry.value(0).toString();
            b = qry.value(1).toString();

            QDateTime date1 = QDateTime::fromString(a,"yyyy-MM-dd HH:mm:ss");
            QDateTime date2 = QDateTime::fromString(b,"yyyy-MM-dd HH:mm:ss");

            c = DateSyntax("date",date1);
            d = DateSyntax("time",date1);
            e = DateSyntax("time",date2);

            g = qry.value(2).toString();

            h = qry.value(3).toString();

            int lunchLength = (g.toInt())*60;

            int secs = date1.secsTo(date2)-lunchLength;
            int hours = secs/3600;
            int minutes = secs%3600/60;

            if(minutes==0)
                f = QString::number(hours)+":"+QString::number(minutes)+"0";
            else
                f = QString::number(hours)+":"+QString::number(minutes);




            j+=hours;
            k+=minutes;
            //qDebug()<<a<<b<<c;
            ui->Employee_page_table2->setItem(current_row,0,new QTableWidgetItem(c));
            ui->Employee_page_table2->setItem(current_row,1,new QTableWidgetItem(d));
            ui->Employee_page_table2->setItem(current_row,2,new QTableWidgetItem(e));

            ui->Employee_page_table2->setItem(current_row,3,new QTableWidgetItem(f));

            ui->Employee_page_table2->setItem(current_row,4,new QTableWidgetItem(g));
            ui->Employee_page_table2->setItem(current_row,5,new QTableWidgetItem(h));
            current_row++;
        }


    }

    else
    {
        ui->statusBar->showMessage("Error:: employee " +qry.lastError().text());
        //Sleep(1000);
        ui->statusBar->showMessage("");
    }

    j+=k/60;
    k=k%60;

    QSqlQuery qryWage(employeeDataBase);
    qryWage.prepare("SELECT wage FROM employeelist where id='"+selected_id+"'");
    double weeklyWage = 0.0;
    QString  wageString;
    if(qryWage.exec())
    {
        while(qryWage.next())
        {
            wageString = qryWage.value(0).toString();
            double wage = wageString.toDouble();
            weeklyWage+=j*wage;
            weeklyWage+=k*(wage/60);


        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee wage " +qryWage.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }

    if(k==0)
        ui->admin_employee_time->setText("Hours Worked: " +QString::number(j)+":"+QString::number(k)+"0");
    else
        ui->admin_employee_time->setText("Hours Worked: " +QString::number(j)+":"+QString::number(k));



    ui->admin_employee_wage->setText("Weekly Wage: $"+QString::number(weeklyWage,'f',2));



}

void MainWindow::on_Employee_page_table1_cellPressed(int row, int column)
{
    column=column;
    ui->Employee_page_table2->clear();
    QString lul=ui->Employee_page_table1->item(row,1)->text();
    QSqlQuery qry(employeeDataBase);
    qry.prepare("SELECT id FROM employeelist WHERE pin = '"+lul+"'");
    if(qry.exec())
    {
        while(qry.next())
        {
            selected_id = qry.value(0).toString();
        }
    }
    update_employee_page_table2();
}
void MainWindow::on_Employee_page_table2_cellPressed(int row, int column)
{
    column = column;
    selected_shiftnumber =ui->Employee_page_table2->item(row,5)->text();



}

void MainWindow::ShowContextMenuEmployee1(const QPoint& pos)
{
    const QPoint globalPos = ui->Employee_page_table1->mapToGlobal(pos);


    QMenu myMenu;
    myMenu.addAction("Add");
    myMenu.addAction("Delete");
    myMenu.addAction("Save");


    QAction* selectedAction = myMenu.exec(globalPos);
    if(selectedAction)
    {
        if(selectedAction->text()=="Add")
        {
            QSqlQuery qry(employeeDataBase);
            QString x;
            int y;
            qry.prepare("SELECT id FROM employeelist ORDER BY id DESC LIMIT 1");
            if (qry.exec())
            {
                while(qry.next())
                {
                    x=qry.value(0).toString();
                    y=x.toInt();
                    y++;
                    x=QString::number(y);
                }
            }
            else
            {
                QString x = "Error(findid)::" +qry.lastError().text();
            }
            QString name,ID,adminstatus,wage;
            int rowcount = ui->Employee_page_table1->rowCount();
            name = ui->Employee_page_table1->item(rowcount-1,0)->text();
            ID = ui->Employee_page_table1->item(rowcount-1,1)->text();
            adminstatus = ui->Employee_page_table1->item(rowcount-1,2)->text();
            wage = ui->Employee_page_table1->item(rowcount-1,3)->text();
            qry.clear();
            qry.prepare("insert into employeelist(name,pin,adminstatus,wage,shiftcount,active,id)  values('"+name+"','"+ID+"','"+adminstatus+"','"+wage+"',0,0,'"+x+"')");
            if (qry.exec())
            {
                ui->statusBar->showMessage("Successfully Added");
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            else
            {
                QString x = "Error::" +qry.lastError().text();
            }


            //This statement creates a table named after the employee's id which holds their clockin and clockout times.
            qry.clear();
            qry.exec("CREATE TABLE '"+x+"'"
                       "( shiftnumber integer, clockin DATETIME, clockout DATETIME,lunch VARCHAR,one VARCHAR ,two VARCHAR ,three VARCHAR ,four VARCHAR ,five VARCHAR ,six VARCHAR ,seven VARCHAR ,eight VARCHAR ,nine VARCHAR ,ten VARCHAR ,eleven VARCHAR ,twelve VARCHAR)");

            update_employeePage_tables();

        }
        else if(selectedAction->text()=="Delete")
        {
            QSqlQuery qry(employeeDataBase);
            qry.prepare("DROP TABLE '"+selected_id+"'");

            if (qry.exec())
            {
                ui->statusBar->showMessage("Successfully Deleted");
                Sleep(1000);
                ui->statusBar->showMessage("");

            }

            qry.clear();
            qry.prepare("delete from employeelist where id='"+selected_id+"'");
            qry.exec();
            update_employeePage_tables();

        }
        else if(selectedAction->text()=="Save")
        {
            for(int i = 0; i<ui->Employee_page_table1->rowCount()-1;i++)
            {
                QString name = ui->Employee_page_table1->item(i,0)->text();
                QString pin = ui->Employee_page_table1->item(i,1)->text();
                QString adminstatus = ui->Employee_page_table1->item(i,2)->text();
                QString wage = ui->Employee_page_table1->item(i,3)->text();
                QString ID = ui->Employee_page_table1->item(i,4)->text();
                QSqlQuery qry(employeeDataBase);
                qry.prepare("update employeelist set name='"+name+"',pin = '"+pin+"',adminstatus = '"+adminstatus+"',wage = '"+wage+"' where id='"+ID+"'");
                qry.exec();
                qry.clear();
            }
            update_employeePage_tables();
        }
    }
    else
    {
        update_employeePage_tables();
    }


}
void MainWindow::ShowContextMenuEmployee2(const QPoint& pos)
{
    const QPoint globalPos = ui->Employee_page_table2->mapToGlobal(pos);


    QMenu myMenu;
    myMenu.addAction("Add");
    myMenu.addAction("Delete");
    myMenu.addAction("Edit");

    QAction* selectedAction = myMenu.exec(globalPos);

    if(selectedAction)
    {
        if(selectedAction->text()=="Add")
        {
            shiftedit_initialize(true);
        }
        else if(selectedAction->text()=="Delete")
        {

            QSqlQuery qry(employeeDataBase);
            qry.prepare("delete from '"+selected_id+"' where shiftnumber='"+selected_shiftnumber+"'");
            qry.exec();
            update_employeePage_tables();

        }
        else if(selectedAction->text()=="Edit")
        {
            shiftedit_initialize(false);

            QString clockin_string,clockout_string,lunch_string,one_string,two_string,three_string,four_string,five_string,six_string,seven_string,eight_string,nine_string,ten_string,eleven_string,twelve_string;
            QSqlQuery qry(employeeDataBase);
            qry.prepare("SELECT clockin,clockout,lunch,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve FROM '"+selected_id+"' WHERE shiftnumber='"+selected_shiftnumber+"'");
            if(qry.exec())
            {
                while(qry.next())
                {
                    clockin_string = qry.value(0).toString();
                    clockout_string = qry.value(1).toString();
                    lunch_string = qry.value(2).toString();
                    one_string = qry.value(3).toString();
                    two_string = qry.value(4).toString();
                    three_string = qry.value(5).toString();
                    four_string = qry.value(6).toString();
                    five_string = qry.value(7).toString();
                    six_string = qry.value(8).toString();
                    seven_string = qry.value(9).toString();
                    eight_string = qry.value(10).toString();
                    nine_string = qry.value(11).toString();
                    ten_string = qry.value(12).toString();
                    eleven_string = qry.value(13).toString();
                    twelve_string = qry.value(14).toString();

                }
            }
            QDateTime clockin = QDateTime::fromString(clockin_string,"yyyy-MM-dd HH:mm:ss" );
            QDateTime clockout = QDateTime::fromString(clockout_string,"yyyy-MM-dd HH:mm:ss");
            ui->shiftedit_datetime1->setDateTime(clockin);
            ui->shiftedit_datetime2->setDateTime(clockout);

            ui->shiftedit_spinbox_lunch->setValue(lunch_string.toInt());

            if(one_string!="Na")
            {
                ui->shiftedit_checkBox1->setChecked(true);

                QString one_project_id =one_string.split(",")[0];
                QString one_item_id = one_string.split(",")[1];
                int one_hour=one_string.split(",")[2].toInt();
                int one_minute=one_string.split(",")[3].toInt();
                QString one_project_name;
                QString one_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+one_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        one_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+one_project_id+"' WHERE id='"+one_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        one_item_name = qry.value(0).toString();
                    }
                }

                ui->shiftedit_comboBox1_1->setCurrentIndex(ui->shiftedit_comboBox1_1->findText(one_project_name));
                ui->shiftedit_comboBox1_2->setCurrentIndex(ui->shiftedit_comboBox1_2->findText(one_item_name));

                ui->shiftedit_spinbox1_1->setValue(one_hour);
                ui->shiftedit_spinbox1_2->setValue(one_minute);

             }
            if(two_string!="Na")
             {
                ui->shiftedit_checkBox2->setChecked(true);

                QString two_project_id =two_string.split(",")[0];
                QString two_item_id = two_string.split(",")[1];
                int two_hour=two_string.split(",")[2].toInt();
                int two_minute=two_string.split(",")[3].toInt();
                QString two_project_name;
                QString two_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+two_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        two_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+two_project_id+"' WHERE id='"+two_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        two_item_name = qry.value(0).toString();
                    }
                }

                ui->shiftedit_comboBox2_1->setCurrentIndex(ui->shiftedit_comboBox2_1->findText(two_project_name));
                ui->shiftedit_comboBox2_2->setCurrentIndex(ui->shiftedit_comboBox2_2->findText(two_item_name));
                ui->shiftedit_spinbox2_1->setValue(two_hour);
                ui->shiftedit_spinbox2_2->setValue(two_minute);



            }
            if(three_string!="Na")
            {
                ui->shiftedit_checkBox3->setChecked(true);

                QString three_project_id =three_string.split(",")[0];
                QString three_item_id = three_string.split(",")[1];
                int three_hour=three_string.split(",")[2].toInt();
                int three_minute=three_string.split(",")[3].toInt();
                QString three_project_name;
                QString three_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+three_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        three_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+three_project_id+"' WHERE id='"+three_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        three_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<three_project_id<<three_item_id<<three_project_name<<three_item_name;
                ui->shiftedit_comboBox3_1->setCurrentIndex(ui->shiftedit_comboBox3_1->findText(three_project_name));
                ui->shiftedit_comboBox3_2->setCurrentIndex(ui->shiftedit_comboBox3_2->findText(three_item_name));
                ui->shiftedit_spinbox3_1->setValue(three_hour);
                ui->shiftedit_spinbox3_2->setValue(three_minute);

            }
            if(four_string!="Na")
            {
                ui->shiftedit_checkBox4->setChecked(true);

                QString four_project_id =four_string.split(",")[0];
                QString four_item_id = four_string.split(",")[1];
                int four_hour=four_string.split(",")[2].toInt();
                int four_minute=four_string.split(",")[3].toInt();
                QString four_project_name;
                QString four_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+four_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        four_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+four_project_id+"' WHERE id='"+four_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        four_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<four_project_id<<four_item_id<<four_project_name<<four_item_name;
                ui->shiftedit_comboBox4_1->setCurrentIndex(ui->shiftedit_comboBox4_1->findText(four_project_name));
                ui->shiftedit_comboBox4_2->setCurrentIndex(ui->shiftedit_comboBox4_2->findText(four_item_name));
                ui->shiftedit_spinbox4_1->setValue(four_hour);
                ui->shiftedit_spinbox4_2->setValue(four_minute);

            }
            if(five_string!="Na")
            {
                ui->shiftedit_checkBox5->setChecked(true);

                QString five_project_id =five_string.split(",")[0];
                QString five_item_id = five_string.split(",")[1];
                int five_hour=five_string.split(",")[2].toInt();
                int five_minute=five_string.split(",")[3].toInt();
                QString five_project_name;
                QString five_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+five_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        five_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+five_project_id+"' WHERE id='"+five_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        five_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<five_project_id<<five_item_id<<five_project_name<<five_item_name;
                ui->shiftedit_comboBox5_1->setCurrentIndex(ui->shiftedit_comboBox5_1->findText(five_project_name));
                ui->shiftedit_comboBox5_2->setCurrentIndex(ui->shiftedit_comboBox5_2->findText(five_item_name));
                ui->shiftedit_spinbox5_1->setValue(five_hour);
                ui->shiftedit_spinbox5_2->setValue(five_minute);

            }
            if(six_string!="Na")
            {
                ui->shiftedit_checkBox6->setChecked(true);

                QString six_project_id =six_string.split(",")[0];
                QString six_item_id = six_string.split(",")[1];
                int six_hour=six_string.split(",")[2].toInt();
                int six_minute=six_string.split(",")[3].toInt();
                QString six_project_name;
                QString six_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+six_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        six_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+six_project_id+"' WHERE id='"+six_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        six_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<six_project_id<<six_item_id<<six_project_name<<six_item_name;
                ui->shiftedit_comboBox6_1->setCurrentIndex(ui->shiftedit_comboBox6_1->findText(six_project_name));
                ui->shiftedit_comboBox6_2->setCurrentIndex(ui->shiftedit_comboBox6_2->findText(six_item_name));
                ui->shiftedit_spinbox6_1->setValue(six_hour);
                ui->shiftedit_spinbox6_2->setValue(six_minute);

            }
            if(seven_string!="Na")
            {
                ui->shiftedit_checkBox7->setChecked(true);

                QString seven_project_id =seven_string.split(",")[0];
                QString seven_item_id = seven_string.split(",")[1];
                int seven_hour=seven_string.split(",")[2].toInt();
                int seven_minute=seven_string.split(",")[3].toInt();
                QString seven_project_name;
                QString seven_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+seven_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        seven_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+seven_project_id+"' WHERE id='"+seven_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        seven_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<seven_project_id<<seven_item_id<<seven_project_name<<seven_item_name;
                ui->shiftedit_comboBox7_1->setCurrentIndex(ui->shiftedit_comboBox7_1->findText(seven_project_name));
                ui->shiftedit_comboBox7_2->setCurrentIndex(ui->shiftedit_comboBox7_2->findText(seven_item_name));
                ui->shiftedit_spinbox7_1->setValue(seven_hour);
                ui->shiftedit_spinbox7_2->setValue(seven_minute);

            }
            if(eight_string!="Na")
            {
                ui->shiftedit_checkBox8->setChecked(true);

                QString eight_project_id =eight_string.split(",")[0];
                QString eight_item_id = eight_string.split(",")[1];
                int eight_hour=eight_string.split(",")[2].toInt();
                int eight_minute=eight_string.split(",")[3].toInt();
                QString eight_project_name;
                QString eight_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+eight_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        eight_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+eight_project_id+"' WHERE id='"+eight_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        eight_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<eight_project_id<<eight_item_id<<eight_project_name<<eight_item_name;
                ui->shiftedit_comboBox8_1->setCurrentIndex(ui->shiftedit_comboBox8_1->findText(eight_project_name));
                ui->shiftedit_comboBox8_2->setCurrentIndex(ui->shiftedit_comboBox8_2->findText(eight_item_name));
                ui->shiftedit_spinbox8_1->setValue(eight_hour);
                ui->shiftedit_spinbox8_2->setValue(eight_minute);

            }
            if(nine_string!="Na")
            {
                ui->shiftedit_checkBox9->setChecked(true);

                QString nine_project_id =nine_string.split(",")[0];
                QString nine_item_id = nine_string.split(",")[1];
                int nine_hour=nine_string.split(",")[2].toInt();
                int nine_minute=nine_string.split(",")[3].toInt();
                QString nine_project_name;
                QString nine_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+nine_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        nine_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+nine_project_id+"' WHERE id='"+nine_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        nine_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<nine_project_id<<nine_item_id<<nine_project_name<<nine_item_name;
                ui->shiftedit_comboBox9_1->setCurrentIndex(ui->shiftedit_comboBox9_1->findText(nine_project_name));
                ui->shiftedit_comboBox9_2->setCurrentIndex(ui->shiftedit_comboBox9_2->findText(nine_item_name));
                ui->shiftedit_spinbox9_1->setValue(nine_hour);
                ui->shiftedit_spinbox9_2->setValue(nine_minute);

            }
            if(ten_string!="Na")
            {
                ui->shiftedit_checkBox10->setChecked(true);

                QString ten_project_id =ten_string.split(",")[0];
                QString ten_item_id = ten_string.split(",")[1];
                int ten_hour=ten_string.split(",")[2].toInt();
                int ten_minute=ten_string.split(",")[3].toInt();
                QString ten_project_name;
                QString ten_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+ten_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        ten_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+ten_project_id+"' WHERE id='"+ten_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        ten_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<ten_project_id<<ten_item_id<<ten_project_name<<ten_item_name;
                ui->shiftedit_comboBox10_1->setCurrentIndex(ui->shiftedit_comboBox10_1->findText(ten_project_name));
                ui->shiftedit_comboBox10_2->setCurrentIndex(ui->shiftedit_comboBox10_2->findText(ten_item_name));
                ui->shiftedit_spinbox10_1->setValue(ten_hour);
                ui->shiftedit_spinbox10_2->setValue(ten_minute);

            }
            if(eleven_string!="Na")
            {
                ui->shiftedit_checkBox11->setChecked(true);

                QString eleven_project_id =eleven_string.split(",")[0];
                QString eleven_item_id = eleven_string.split(",")[1];
                int eleven_hour=eleven_string.split(",")[2].toInt();
                int eleven_minute=eleven_string.split(",")[3].toInt();
                QString eleven_project_name;
                QString eleven_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+eleven_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        eleven_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+eleven_project_id+"' WHERE id='"+eleven_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        eleven_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<eleven_project_id<<eleven_item_id<<eleven_project_name<<eleven_item_name;
                ui->shiftedit_comboBox11_1->setCurrentIndex(ui->shiftedit_comboBox11_1->findText(eleven_project_name));
                ui->shiftedit_comboBox11_2->setCurrentIndex(ui->shiftedit_comboBox11_2->findText(eleven_item_name));
                ui->shiftedit_spinbox11_1->setValue(eleven_hour);
                ui->shiftedit_spinbox11_2->setValue(eleven_minute);

            }
            if(twelve_string!="Na")
            {
                ui->shiftedit_checkBox12->setChecked(true);

                QString twelve_project_id =twelve_string.split(",")[0];
                QString twelve_item_id = twelve_string.split(",")[1];
                int twelve_hour=twelve_string.split(",")[2].toInt();
                int twelve_minute=twelve_string.split(",")[3].toInt();
                QString twelve_project_name;
                QString twelve_item_name;

                QSqlQuery qry(projectDataBase);
                qry.prepare("SELECT name FROM projectlist WHERE id='"+twelve_project_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        twelve_project_name = qry.value(0).toString();
                    }
                }
                qry.clear();
                qry.prepare("SELECT name FROM '"+twelve_project_id+"' WHERE id='"+twelve_item_id+"'");
                if(qry.exec())
                {
                    while(qry.next())
                    {
                        twelve_item_name = qry.value(0).toString();
                    }
                }
                qDebug()<<twelve_project_id<<twelve_item_id<<twelve_project_name<<twelve_item_name;
                ui->shiftedit_comboBox12_1->setCurrentIndex(ui->shiftedit_comboBox12_1->findText(twelve_project_name));
                ui->shiftedit_comboBox12_2->setCurrentIndex(ui->shiftedit_comboBox12_2->findText(twelve_item_name));
                ui->shiftedit_spinbox12_1->setValue(twelve_hour);
                ui->shiftedit_spinbox12_2->setValue(twelve_minute);

            }


        }
    }
    else
    {

    }
}

void MainWindow::on_Employee_page_finish_clicked()
{
    admin_initialize();
}


//ProjectPage
void MainWindow::projectPage_initialize()
{
    ui->stackedWidget->setCurrentIndex(7);

    ui->Project_page_table1->setContextMenuPolicy(Qt::CustomContextMenu);
    connect(ui->Project_page_table1,SIGNAL(customContextMenuRequested(const QPoint&)), this, SLOT(ShowContextMenuProject1(const QPoint&)));
    ui->Project_page_table2->setContextMenuPolicy(Qt::CustomContextMenu);
    connect(ui->Project_page_table2,SIGNAL(customContextMenuRequested(const QPoint&)), this, SLOT(ShowContextMenuProject2(const QPoint&)));

    update_projectPage_tables();

}
void MainWindow::update_projectPage_tables()
{
    update_project_page_table1();

    update_project_page_table2();
}
void MainWindow::update_project_page_table1()
{
    QSqlQuery qry(projectDataBase);
    QString active ="1";
    qry.prepare("SELECT name,id FROM projectlist where active='"+active+"'");
    QString a,b;

    ui->Project_page_table1->clearContents();
    ui->Project_page_table1->setRowCount(0);
    ui->Project_page_table1->setColumnCount(4);
    ui->Project_page_table1->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    ui->Project_page_table1->setHorizontalHeaderItem(1,new QTableWidgetItem("ID"));
    ui->Project_page_table1->setHorizontalHeaderItem(2,new QTableWidgetItem("Est. Time"));
    ui->Project_page_table1->setHorizontalHeaderItem(3,new QTableWidgetItem("Est. Cost"));

    ui->Project_page_table1->setShowGrid(false);
    ui->Project_page_table1->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->Project_page_table1->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->Project_page_table1->verticalHeader()->hide();

    if(qry.exec())
    {
        while(qry.next())
        {
            ui->Project_page_table1->setRowCount(ui->Project_page_table1->rowCount()+1);
            a = qry.value(0).toString();
            //qDebug()<<a;
            b = qry.value(1).toString();

            QTableWidgetItem *x = new QTableWidgetItem(a);
            x->setFlags(Qt::ItemIsEditable|Qt::ItemIsSelectable|Qt::ItemIsEnabled);
            ui->Project_page_table1->setItem(ui->Project_page_table1->rowCount()-1,0,x);
            ui->Project_page_table1->setItem(ui->Project_page_table1->rowCount()-1,1,new QTableWidgetItem(b));
            //current_row++;
        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: project list " +qry.lastError().text());
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    QSqlQuery qry2(projectDataBase),qry3(projectDataBase);

    for(int x=0; x <ui->Project_page_table1->rowCount();x++)
    {
        int u=0,i=0;
        double o=0.0;
        QString thisId = ui->Project_page_table1->item(x,1)->text();
        //qDebug()<<thisId;
        qry2.prepare("SELECT length,cost FROM '"+thisId+"'");
        if(qry2.exec())
        {
            while(qry2.next())
            {
                QString a = qry2.value(0).toString();
                u+=a.split(":")[0].toInt();
                i+=a.split(":")[1].toInt();
                double b = qry2.value(1).toDouble();
                o+=b;
            }
        }
        QString length= QString::number(u)+":"+QString::number(i);
        if(QString::number(i)=="0")
        {
            length+="0";
        }
        ui->Project_page_table1->setItem(x,2,new QTableWidgetItem(length));
        ui->Project_page_table1->setItem(x,3,new QTableWidgetItem(QString::number(o,'f',2)));
    }





    /* HELPFUL IF YOU WANT YOUR CONTENT TO SPAN BOX
     *
    for (int c = 0; c < ui->Project_page_table1->horizontalHeader()->count(); ++c)
    {
        ui->Project_page_table1->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }*/

    ui->Project_page_table1->resizeColumnsToContents();

    ui->Project_page_table1->setRowCount(ui->Project_page_table1->rowCount()+1);
    ui->Project_page_table1->setItem(ui->Project_page_table1->rowCount()-1,0,new QTableWidgetItem("~Name"));
    ui->Project_page_table1->setItem(ui->Project_page_table1->rowCount()-1,1,new QTableWidgetItem("~ID"));

}
void MainWindow::update_project_page_table2()
{


    QSqlQuery qry(projectDataBase);
    QString random ="1";
    qry.prepare("select id from projectlist where active = '"+random+"'");
    if (qry.exec())
    {
        while(qry.next()&&selected_pl_id=="")
        {
            selected_pl_id= qry.value(0).toString();
        }
    }
    qry.clear();
    qry.prepare("SELECT name,length,cost FROM '"+selected_pl_id+"'");
    qDebug()<<selected_pl_id;
    ui->Project_page_table2->setColumnCount(3);
    ui->Project_page_table2->setHorizontalHeaderItem(0,new QTableWidgetItem("Name"));
    ui->Project_page_table2->setHorizontalHeaderItem(1,new QTableWidgetItem("Est. Time"));
    ui->Project_page_table2->setHorizontalHeaderItem(2,new QTableWidgetItem("Est. Cost"));
    for (int c = 0; c < ui->Project_page_table2->horizontalHeader()->count(); ++c)
    {
        ui->Project_page_table2->horizontalHeader()->setSectionResizeMode(
            c, QHeaderView::Stretch);
    }
    int j=0,k=0;
    QString a,b;
    double c;
    int current_row = 0;
    ui->Project_page_table2->setShowGrid(false);
    ui->Project_page_table2->setEditTriggers(QAbstractItemView::NoEditTriggers);
    ui->Project_page_table2->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);
    ui->Project_page_table2->verticalHeader()->hide();
    if(qry.exec())
    {
        int novalue = 0;
        while(qry.next())
        {
            //qDebug()<<"IM here";
            ui->Project_page_table2->setRowCount(current_row+1);
            a = qry.value(0).toString();

            b = qry.value(1).toString();
            int hour = b.split(":")[0].toInt();
            int minute = b.split(":")[1].toInt();
            if(hour!=-1)
                j+=hour;
            if(minute!=-1)
                k+=minute;
            c = qry.value(2).toDouble();

            ui->Project_page_table2->setItem(current_row,0,new QTableWidgetItem(a));
            ui->Project_page_table2->setItem(current_row,1,new QTableWidgetItem(b));
            ui->Project_page_table2->setItem(current_row,2,new QTableWidgetItem(QString::number(c,'f',2)));
            novalue=1;
            current_row++;

        }
        //This whole  novalue thing is for if the table is empty. It was crashing a bunch and
        //this is something I found that fixed it when in that condition.
        if(novalue==0)
        {

            ui->Project_page_table2->setRowCount(ui->Project_page_table2->rowCount()-1);

        }

    }
    else
    {
        ui->statusBar->showMessage("Error:: employee " +qry.lastError().text());
        //Sleep(1000);
        ui->statusBar->showMessage("");
    }

    j+=k/60;
    k=k%60;
    ui->admin_project_time->hide();
    /*if(k==0)
        ui->admin_project_time->setText("Total Project Time: " +QString::number(j)+":"+QString::number(k)+"0");
    else
        ui->admin_project_time->setText("Total Project Time: " +QString::number(j)+":"+QString::number(k));*/
    admin_update_project_combo();
    admin_update_project_combo2();
    admin_update_project_combo3();

}
void MainWindow::ShowContextMenuProject1(const QPoint& pos)
{
    const QPoint globalPos = ui->Project_page_table1->mapToGlobal(pos);


    QMenu myMenu;
    myMenu.addAction("Add");
    myMenu.addAction("Archive");
    myMenu.addAction("Delete");
    myMenu.addAction("Save");

    QAction* selectedAction = myMenu.exec(globalPos);
    if(selectedAction)
    {

    }
    else
    {

    }

}
void MainWindow::ShowContextMenuProject2(const QPoint& pos)
{
    const QPoint globalPos = ui->Project_page_table2->mapToGlobal(pos);


    QMenu myMenu;
    myMenu.addAction("Add");
    myMenu.addAction("Delete");


    QAction* selectedAction = myMenu.exec(globalPos);
    if(selectedAction)
    {

    }
    else
    {

    }

}
void MainWindow::on_Project_page_finish_clicked()
{
    admin_initialize();
}






//shiftedit
void MainWindow::shiftedit_initialize(bool x)
{
    ui->stackedWidget->setCurrentIndex(4);
    if(x == true)
    {
        ui->shiftedit_finished_adding->show();
        ui->shiftedit_finished_editing->hide();

        QTime time = QTime::currentTime();
        time.setHMS(8,0,0);
        ui->shiftedit_datetime1->setDate(QDate::currentDate());
        ui->shiftedit_datetime1->setTime(time);
        time.setHMS(17,0,0);
        ui->shiftedit_datetime2->setDate(QDate::currentDate());
        ui->shiftedit_datetime2->setTime(time);
    }
    else if(x == false)
    {
        ui->shiftedit_finished_editing->show();
        ui->shiftedit_finished_adding->hide();
    }



    ui->shiftedit_hbox2->hide();
    ui->shiftedit_hbox3->hide();
    ui->shiftedit_hbox4->hide();
    ui->shiftedit_hbox5->hide();
    ui->shiftedit_hbox6->hide();
    ui->shiftedit_hbox7->hide();
    ui->shiftedit_hbox8->hide();
    ui->shiftedit_hbox9->hide();
    ui->shiftedit_hbox10->hide();
    ui->shiftedit_hbox11->hide();
    ui->shiftedit_hbox12->hide();
    shiftedit_length();
    shiftedit_remain_length();
    ui->shiftedit_progress->setMinimum(0);
    ui->shiftedit_progress->setValue(0);
}
void MainWindow::shiftedit_length()
{
    QTime t1 = ui->shiftedit_datetime1->time();
    QTime t2 = ui->shiftedit_datetime2->time();
    int x = t1.msecsTo(t2);
    QDate d1 = ui->shiftedit_datetime1->date();
    QDate d2 = ui->shiftedit_datetime2->date();
    int y = d1.daysTo(d2);

    x+=(y*86400000);
    x=x/60000;
    QString a = QString::number(x/60);
    QString b = QString::number(x%60);
    ui->shiftedit_label_1->setText(a+":"+b);
    ui->shiftedit_progress->setMaximum(x);
}
void MainWindow::shiftedit_remain_length()
{
    QString total_time = ui->shiftedit_label_1->text();
    int total_time_minutes = total_time.split(":")[0].toInt()*60+total_time.split(":")[1].toInt();


    total_time_minutes -= ui->shiftedit_spinbox1_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox2_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox3_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox4_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox5_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox6_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox7_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox8_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox9_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox10_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox11_1->text().toInt()*60;
    total_time_minutes -= ui->shiftedit_spinbox12_1->text().toInt()*60;

    total_time_minutes -= ui->shiftedit_spinbox1_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox2_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox3_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox4_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox5_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox6_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox7_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox8_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox9_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox10_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox11_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox12_2->text().toInt();
    total_time_minutes -= ui->shiftedit_spinbox_lunch->text().toInt();


    int c = total_time.split(":")[0].toInt()*60+total_time.split(":")[1].toInt();
    int d = total_time_minutes;

    ui->shiftedit_label_3->setText(QString::number(total_time_minutes/60)+":"+QString::number(total_time_minutes%60));
    ui->shiftedit_progress->setValue(c-d);
}
void MainWindow::on_shiftedit_finished_adding_clicked()
{
    QString remaining_time = ui->shiftedit_label_3->text();
    qDebug()<<remaining_time;
    int hours = remaining_time.split(":")[0].toInt();
    int minutes = remaining_time.split(":")[1].toInt();

    if(hours<0)
    {
        ui->statusBar->showMessage("You Over-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if (hours>0)
    {
        ui->statusBar->showMessage("You Under-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(minutes<0)
    {
        ui->statusBar->showMessage("You Over-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(minutes>0)
    {
        ui->statusBar->showMessage("You Under-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if (minutes==0&&hours==0)
    {

        QSqlQuery qry(employeeDataBase), qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase),qry4(employeeDataBase);
        QDateTime clockin_time = ui->shiftedit_datetime1->dateTime();
        QDateTime clockout_time = ui->shiftedit_datetime2->dateTime();
        QString clockin_time_string = clockin_time.toString("yyyy-MM-dd HH:mm:ss");
        QString clockout_time_string = clockout_time.toString("yyyy-MM-dd HH:mm:ss");



        qry1.prepare("SELECT shiftnumber FROM '"+selected_id+"'");
        QString shiftcount;
        if(qry1.exec())
        {
            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }


        int secs = clockin_time.secsTo(clockout_time);
        int hours = secs/3600;
        int minutes = secs%3600/60;
        QString length = QString::number(hours)+":"+QString::number(minutes);
        if(minutes==0)
            QString length = QString::number(hours)+":"+QString::number(minutes)+"0";
        else
            QString length = QString::number(hours)+":"+QString::number(minutes);
        int shiftcountInt = shiftcount.toInt();
        shiftcountInt++;
        shiftcount = QString::number(shiftcountInt);


        QString lunchTime = QString::number(ui->shiftedit_spinbox_lunch->value());


        QString one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve;

        QSqlQuery projectQry(projectDataBase),itemQry(projectDataBase);
        if(ui->shiftedit_checkBox1->checkState()==2)
        {
            QString project1 = ui->shiftedit_comboBox1_1->currentText();
            QString item1 = ui->shiftedit_comboBox1_2->currentText();
            QString hour1 = ui->shiftedit_spinbox1_1->text();
            QString minute1 = ui->shiftedit_spinbox1_2->text();



            QString project1id;
            projectQry.prepare("Select id from projectlist where name ='"+project1+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project1id = projectQry.value(0).toString();
                }
            }
            QString item1id;

            itemQry.prepare("Select id from '"+project1id+"' where name='"+item1+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item1id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            one = project1id+","+item1id+","+hour1+","+minute1;

        }
        else
        {
            one = "Na";
        }

        if(ui->shiftedit_checkBox2->checkState()==2)
        {
            QString project2 = ui->shiftedit_comboBox2_1->currentText();
            QString item2 = ui->shiftedit_comboBox2_2->currentText();
            QString hour2 = ui->shiftedit_spinbox2_1->text();
            QString minute2 = ui->shiftedit_spinbox2_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project2id;
            projectQry.prepare("Select id from projectlist where name ='"+project2+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project2id = projectQry.value(0).toString();
                }
            }


            QString item2id;
            itemQry.prepare("Select id from '"+project2id+"' where name='"+item2+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item2id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            two = project2id+","+item2id+","+hour2+","+minute2;
        }
        else
        {
            two="Na";
        }

        if(ui->shiftedit_checkBox3->checkState()==2)
        {
            QString project3 = ui->shiftedit_comboBox3_1->currentText();
            QString item3 = ui->shiftedit_comboBox3_2->currentText();
            QString hour3 = ui->shiftedit_spinbox3_1->text();
            QString minute3 = ui->shiftedit_spinbox3_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project3id;
            projectQry.prepare("Select id from projectlist where name ='"+project3+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project3id = projectQry.value(0).toString();
                }
            }
            QString item3id;
            itemQry.prepare("Select id from '"+project3id+"' where name='"+item3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item3id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            three = project3id+","+item3id+","+hour3+","+minute3;
        }
        else
        {
            three="Na";
        }

        if(ui->shiftedit_checkBox4->checkState()==2)
        {
            QString project4 = ui->shiftedit_comboBox4_1->currentText();
            QString item4 = ui->shiftedit_comboBox4_2->currentText();
            QString hour4 = ui->shiftedit_spinbox4_1->text();
            QString minute4 = ui->shiftedit_spinbox4_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project4id;
            projectQry.prepare("Select id from projectlist where name ='"+project4+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project4id = projectQry.value(0).toString();
                }
            }
            QString item4id;
            itemQry.prepare("Select id from '"+project4id+"' where name='"+item4+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item4id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            four = project4id+","+item4id+","+hour4+","+minute4;
        }
        else
        {
            four="Na";
        }

        if(ui->shiftedit_checkBox5->checkState()==2)
        {
            QString project5 = ui->shiftedit_comboBox5_1->currentText();
            QString item5 = ui->shiftedit_comboBox5_2->currentText();
            QString hour5 = ui->shiftedit_spinbox5_1->text();
            QString minute5 = ui->shiftedit_spinbox5_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project5id;
            projectQry.prepare("Select id from projectlist where name ='"+project5+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project5id = projectQry.value(0).toString();
                }
            }
            QString item5id;
            itemQry.prepare("Select id from '"+project5id+"' where name='"+item5+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item5id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            five = project5id+","+item5id+","+hour5+","+minute5;
        }
        else
        {
            five="Na";
        }

        if(ui->shiftedit_checkBox6->checkState()==2)
        {
            QString project6 = ui->shiftedit_comboBox6_1->currentText();
            QString item6 = ui->shiftedit_comboBox6_2->currentText();
            QString hour6 = ui->shiftedit_spinbox6_1->text();
            QString minute6 = ui->shiftedit_spinbox6_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project6id;
            projectQry.prepare("Select id from projectlist where name ='"+project6+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project6id = projectQry.value(0).toString();
                }
            }
            QString item6id;
            itemQry.prepare("Select id from '"+project6id+"' where name='"+item6+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item6id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            six = project6id+","+item6id+","+hour6+","+minute6;
        }
        else
        {
            six="Na";
        }

        if(ui->shiftedit_checkBox7->checkState()==2)
        {
            QString project7 = ui->shiftedit_comboBox7_1->currentText();
            QString item7 = ui->shiftedit_comboBox7_2->currentText();
            QString hour7 = ui->shiftedit_spinbox7_1->text();
            QString minute7 = ui->shiftedit_spinbox7_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project7id;
            projectQry.prepare("Select id from projectlist where name ='"+project7+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project7id = projectQry.value(0).toString();
                }
            }
            QString item7id;
            itemQry.prepare("Select id from '"+project7id+"' where name='"+item7+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item7id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            seven = project7id+","+item7id+","+hour7+","+minute7;
        }
        else
        {
            seven="Na";
        }

        if(ui->shiftedit_checkBox8->checkState()==2)
        {
            QString project8 = ui->shiftedit_comboBox8_1->currentText();
            QString item8 = ui->shiftedit_comboBox8_2->currentText();
            QString hour8 = ui->shiftedit_spinbox8_1->text();
            QString minute8 = ui->shiftedit_spinbox8_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project8id;
            projectQry.prepare("Select id from projectlist where name ='"+project8+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project8id = projectQry.value(0).toString();
                }
            }
            QString item8id;
            itemQry.prepare("Select id from '"+project8id+"' where name='"+item8+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item8id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            eight = project8id+","+item8id+","+hour8+","+minute8;
        }
        else
        {
            eight="Na";
        }

        if(ui->shiftedit_checkBox9->checkState()==2)
        {
            QString project9 = ui->shiftedit_comboBox9_1->currentText();
            QString item9 = ui->shiftedit_comboBox9_2->currentText();
            QString hour9 = ui->shiftedit_spinbox9_1->text();
            QString minute9 = ui->shiftedit_spinbox9_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project9id;
            projectQry.prepare("Select id from projectlist where name ='"+project9+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project9id = projectQry.value(0).toString();
                }
            }
            QString item9id;
            itemQry.prepare("Select id from '"+project9id+"' where name='"+item9+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item9id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            nine = project9id+","+item9id+","+hour9+","+minute9;
        }
        else
        {
            nine="Na";
        }

        if(ui->shiftedit_checkBox10->checkState()==2)
        {
            QString project10 = ui->shiftedit_comboBox10_1->currentText();
            QString item10 = ui->shiftedit_comboBox10_2->currentText();
            QString hour10 = ui->shiftedit_spinbox10_1->text();
            QString minute10 = ui->shiftedit_spinbox10_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project10id;
            projectQry.prepare("Select id from projectlist where name ='"+project10+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project10id = projectQry.value(0).toString();
                }
            }
            QString item10id;
            itemQry.prepare("Select id from '"+project10id+"' where name='"+item10+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item10id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            ten = project10id+","+item10id+","+hour10+","+minute10;
        }
        else
        {
            ten="Na";
        }

        if(ui->shiftedit_checkBox11->checkState()==2)
        {
            QString project11 = ui->shiftedit_comboBox11_1->currentText();
            QString item11 = ui->shiftedit_comboBox11_2->currentText();
            QString hour11 = ui->shiftedit_spinbox11_1->text();
            QString minute11 = ui->shiftedit_spinbox11_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project11id;
            projectQry.prepare("Select id from projectlist where name ='"+project11+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project11id = projectQry.value(0).toString();
                }
            }
            QString item11id;
            itemQry.prepare("Select id from '"+project11id+"' where name='"+item11+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item11id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            eleven = project11id+","+item11id+","+hour11+","+minute11;
        }
        else
        {
            eleven="Na";
        }

        if(ui->shiftedit_checkBox12->checkState()==2)
        {
            QString project12 = ui->shiftedit_comboBox12_1->currentText();
            QString item12 = ui->shiftedit_comboBox12_2->currentText();
            QString hour12 = ui->shiftedit_spinbox12_1->text();
            QString minute12 = ui->shiftedit_spinbox12_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project12id;
            projectQry.prepare("Select id from projectlist where name ='"+project12+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project12id = projectQry.value(0).toString();
                }
            }
            QString item12id;
            itemQry.prepare("Select id from '"+project12id+"' where name='"+item12+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item12id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            twelve = project12id+","+item12id+","+hour12+","+minute12;
        }
        else
        {
            twelve="Na";
        }






        // Inserting clockin time and shiftnumber into pin.
        qry4.prepare("insert into '"+selected_id+"' (shiftnumber,clockin,clockout,lunch,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve) "
                                        "values('"+shiftcount+"','"+clockin_time_string+"','"+clockout_time_string+"','"+lunchTime+"','"+one+"','"+two+"',"
                                        "'"+three+"','"+four+"','"+five+"','"+six+"','"+seven+"','"+eight+"','"+nine+"','"+ten+"','"+eleven+"','"+twelve+"')");

        if(qry4.exec())
        {
            ui->shiftedit_checkBox1->setChecked(false);
            ui->shiftedit_spinbox1_1->setValue(0);
            ui->shiftedit_spinbox1_2->setValue(0);
            ui->shiftedit_spinbox_lunch->setValue(0);

            employeePage_initialize();
            ui->statusBar->showMessage("Addition Successful");
            Sleep(1000);
            ui->statusBar->showMessage("");

        }
        else
        {
            ui->shiftedit_checkBox1->setChecked(false);
            ui->shiftedit_spinbox1_1->setValue(0);
            ui->shiftedit_spinbox1_2->setValue(0);
            ui->shiftedit_spinbox_lunch->setValue(0);

            employeePage_initialize();
            ui->statusBar->showMessage("Error4::" +qry4.lastError().text());
            Sleep(1000);
            ui->statusBar->showMessage("");
        }
    }
}
void MainWindow::on_shiftedit_finished_editing_clicked()
{
    QString remaining_time = ui->shiftedit_label_3->text();

    int hours = remaining_time.split(":")[0].toInt();
    int minutes = remaining_time.split(":")[1].toInt();

    if(hours<0)
    {
        ui->statusBar->showMessage("You Over-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if (hours>0)
    {
        ui->statusBar->showMessage("You Under-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(minutes<0)
    {
        ui->statusBar->showMessage("You Over-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(minutes>0)
    {
        ui->statusBar->showMessage("You Under-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if (minutes==0&&hours==0)
    {

        QSqlQuery qry4(employeeDataBase);
        QDateTime clockin_time = ui->shiftedit_datetime1->dateTime();
        QDateTime clockout_time = ui->shiftedit_datetime2->dateTime();
        QString clockin_time_string = clockin_time.toString("yyyy-MM-dd HH:mm:ss");
        QString clockout_time_string = clockout_time.toString("yyyy-MM-dd HH:mm:ss");






        int secs = clockin_time.secsTo(clockout_time);
        int hours = secs/3600;
        int minutes = secs%3600/60;
        QString length = QString::number(hours)+":"+QString::number(minutes);
        if(minutes==0)
            QString length = QString::number(hours)+":"+QString::number(minutes)+"0";
        else
            QString length = QString::number(hours)+":"+QString::number(minutes);



        QString lunchTime = QString::number(ui->shiftedit_spinbox_lunch->value());


        QString one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve;

        QSqlQuery projectQry(projectDataBase),itemQry(projectDataBase);
        if(ui->shiftedit_checkBox1->checkState()==2)
        {
            QString project1 = ui->shiftedit_comboBox1_1->currentText();
            QString item1 = ui->shiftedit_comboBox1_2->currentText();
            QString hour1 = ui->shiftedit_spinbox1_1->text();
            QString minute1 = ui->shiftedit_spinbox1_2->text();



            QString project1id;
            projectQry.prepare("Select id from projectlist where name ='"+project1+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project1id = projectQry.value(0).toString();
                }
            }
            QString item1id;

            itemQry.prepare("Select id from '"+project1id+"' where name='"+item1+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item1id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            one = project1id+","+item1id+","+hour1+","+minute1;

        }
        else
        {
            one = "Na";
        }

        if(ui->shiftedit_checkBox2->checkState()==2)
        {
            QString project2 = ui->shiftedit_comboBox2_1->currentText();
            QString item2 = ui->shiftedit_comboBox2_2->currentText();
            QString hour2 = ui->shiftedit_spinbox2_1->text();
            QString minute2 = ui->shiftedit_spinbox2_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project2id;
            projectQry.prepare("Select id from projectlist where name ='"+project2+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project2id = projectQry.value(0).toString();
                }
            }
            QString item2id;
            itemQry.prepare("Select id from '"+project2id+"' where name='"+item2+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item2id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            two = project2id+","+item2id+","+hour2+","+minute2;
        }
        else
        {
            two="Na";
        }

        if(ui->shiftedit_checkBox3->checkState()==2)
        {
            QString project3 = ui->shiftedit_comboBox3_1->currentText();
            QString item3 = ui->shiftedit_comboBox3_2->currentText();
            QString hour3 = ui->shiftedit_spinbox3_1->text();
            QString minute3 = ui->shiftedit_spinbox3_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project3id;
            projectQry.prepare("Select id from projectlist where name ='"+project3+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project3id = projectQry.value(0).toString();
                }
            }
            QString item3id;
            itemQry.prepare("Select id from '"+project3id+"' where name='"+item3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item3id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            three = project3id+","+item3id+","+hour3+","+minute3;
        }
        else
        {
            three="Na";
        }

        if(ui->shiftedit_checkBox4->checkState()==2)
        {
            QString project4 = ui->shiftedit_comboBox4_1->currentText();
            QString item4 = ui->shiftedit_comboBox4_2->currentText();
            QString hour4 = ui->shiftedit_spinbox4_1->text();
            QString minute4 = ui->shiftedit_spinbox4_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project4id;
            projectQry.prepare("Select id from projectlist where name ='"+project4+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project4id = projectQry.value(0).toString();
                }
            }
            QString item4id;
            itemQry.prepare("Select id from '"+project4id+"' where name='"+item4+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item4id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            four = project4id+","+item4id+","+hour4+","+minute4;
        }
        else
        {
            four="Na";
        }

        if(ui->shiftedit_checkBox5->checkState()==2)
        {
            QString project5 = ui->shiftedit_comboBox5_1->currentText();
            QString item5 = ui->shiftedit_comboBox5_2->currentText();
            QString hour5 = ui->shiftedit_spinbox5_1->text();
            QString minute5 = ui->shiftedit_spinbox5_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project5id;
            projectQry.prepare("Select id from projectlist where name ='"+project5+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project5id = projectQry.value(0).toString();
                }
            }
            QString item5id;
            itemQry.prepare("Select id from '"+project5id+"' where name='"+item5+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item5id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            five = project5id+","+item5id+","+hour5+","+minute5;
        }
        else
        {
            five="Na";
        }

        if(ui->shiftedit_checkBox6->checkState()==2)
        {
            QString project6 = ui->shiftedit_comboBox6_1->currentText();
            QString item6 = ui->shiftedit_comboBox6_2->currentText();
            QString hour6 = ui->shiftedit_spinbox6_1->text();
            QString minute6 = ui->shiftedit_spinbox6_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project6id;
            projectQry.prepare("Select id from projectlist where name ='"+project6+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project6id = projectQry.value(0).toString();
                }
            }
            QString item6id;
            itemQry.prepare("Select id from '"+project6id+"' where name='"+item6+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item6id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            six = project6id+","+item6id+","+hour6+","+minute6;
        }
        else
        {
            six="Na";
        }

        if(ui->shiftedit_checkBox7->checkState()==2)
        {
            QString project7 = ui->shiftedit_comboBox7_1->currentText();
            QString item7 = ui->shiftedit_comboBox7_2->currentText();
            QString hour7 = ui->shiftedit_spinbox7_1->text();
            QString minute7 = ui->shiftedit_spinbox7_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project7id;
            projectQry.prepare("Select id from projectlist where name ='"+project7+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project7id = projectQry.value(0).toString();
                }
            }
            QString item7id;
            itemQry.prepare("Select id from '"+project7id+"' where name='"+item7+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item7id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            seven = project7id+","+item7id+","+hour7+","+minute7;
        }
        else
        {
            seven="Na";
        }

        if(ui->shiftedit_checkBox8->checkState()==2)
        {
            QString project8 = ui->shiftedit_comboBox8_1->currentText();
            QString item8 = ui->shiftedit_comboBox8_2->currentText();
            QString hour8 = ui->shiftedit_spinbox8_1->text();
            QString minute8 = ui->shiftedit_spinbox8_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project8id;
            projectQry.prepare("Select id from projectlist where name ='"+project8+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project8id = projectQry.value(0).toString();
                }
            }
            QString item8id;
            itemQry.prepare("Select id from '"+project8id+"' where name='"+item8+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item8id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            eight = project8id+","+item8id+","+hour8+","+minute8;
        }
        else
        {
            eight="Na";
        }

        if(ui->shiftedit_checkBox9->checkState()==2)
        {
            QString project9 = ui->shiftedit_comboBox9_1->currentText();
            QString item9 = ui->shiftedit_comboBox9_2->currentText();
            QString hour9 = ui->shiftedit_spinbox9_1->text();
            QString minute9 = ui->shiftedit_spinbox9_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project9id;
            projectQry.prepare("Select id from projectlist where name ='"+project9+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project9id = projectQry.value(0).toString();
                }
            }
            QString item9id;
            itemQry.prepare("Select id from '"+project9id+"' where name='"+item9+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item9id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            nine = project9id+","+item9id+","+hour9+","+minute9;
        }
        else
        {
            nine="Na";
        }

        if(ui->shiftedit_checkBox10->checkState()==2)
        {
            QString project10 = ui->shiftedit_comboBox10_1->currentText();
            QString item10 = ui->shiftedit_comboBox10_2->currentText();
            QString hour10 = ui->shiftedit_spinbox10_1->text();
            QString minute10 = ui->shiftedit_spinbox10_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project10id;
            projectQry.prepare("Select id from projectlist where name ='"+project10+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project10id = projectQry.value(0).toString();
                }
            }
            QString item10id;
            itemQry.prepare("Select id from '"+project10id+"' where name='"+item10+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item10id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            ten = project10id+","+item10id+","+hour10+","+minute10;
        }
        else
        {
            ten="Na";
        }

        if(ui->shiftedit_checkBox11->checkState()==2)
        {
            QString project11 = ui->shiftedit_comboBox11_1->currentText();
            QString item11 = ui->shiftedit_comboBox11_2->currentText();
            QString hour11 = ui->shiftedit_spinbox11_1->text();
            QString minute11 = ui->shiftedit_spinbox11_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project11id;
            projectQry.prepare("Select id from projectlist where name ='"+project11+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project11id = projectQry.value(0).toString();
                }
            }
            QString item11id;
            itemQry.prepare("Select id from '"+project11id+"' where name='"+item11+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item11id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            eleven = project11id+","+item11id+","+hour11+","+minute11;
        }
        else
        {
            eleven="Na";
        }

        if(ui->shiftedit_checkBox12->checkState()==2)
        {
            QString project12 = ui->shiftedit_comboBox12_1->currentText();
            QString item12 = ui->shiftedit_comboBox12_2->currentText();
            QString hour12 = ui->shiftedit_spinbox12_1->text();
            QString minute12 = ui->shiftedit_spinbox12_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project12id;
            projectQry.prepare("Select id from projectlist where name ='"+project12+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project12id = projectQry.value(0).toString();
                }
            }
            QString item12id;
            itemQry.prepare("Select id from '"+project12id+"' where name='"+item12+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item12id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            twelve = project12id+","+item12id+","+hour12+","+minute12;
        }
        else
        {
            twelve="Na";
        }




        qry4.prepare("update '"+selected_id+"' set clockin='"+clockin_time_string+"',clockout='"+clockout_time_string+"',lunch='"+lunchTime+"',one = '"+one+"',two = '"+two+"',three = '"+three+"',four = '"+four+"',five = '"+five+"'"
               ",six = '"+six+"',seven = '"+seven+"',eight = '"+eight+"',nine = '"+nine+"',ten = '"+ten+"',eleven = '"+eleven+"',twelve = '"+twelve+"'  where shiftnumber = '"+selected_shiftnumber+"'");


        if(qry4.exec())
        {
            ui->shiftedit_checkBox1->setChecked(false);
            ui->shiftedit_spinbox1_1->setValue(0);
            ui->shiftedit_spinbox1_2->setValue(0);
            ui->shiftedit_spinbox_lunch->setValue(0);

            employeePage_initialize();
            ui->statusBar->showMessage("Addition Successful");
            Sleep(1000);
            ui->statusBar->showMessage("");

        }
        else
        {
            ui->shiftedit_checkBox1->setChecked(false);
            ui->shiftedit_spinbox1_1->setValue(0);
            ui->shiftedit_spinbox1_2->setValue(0);
            ui->shiftedit_spinbox_lunch->setValue(0);

            employeePage_initialize();
            ui->statusBar->showMessage("Error::" +qry4.lastError().text());
            Sleep(1000);
            ui->statusBar->showMessage("");
        }
    }
}

void MainWindow::on_shiftedit_cancel_clicked()
{

    ui->shiftedit_checkBox1->setChecked(false);
    ui->shiftedit_spinbox1_1->setValue(0);
    ui->shiftedit_spinbox1_2->setValue(0);
    ui->shiftedit_spinbox_lunch->setValue(0);

    employeePage_initialize();
    ui->statusBar->showMessage("Edit or Addition Canceled");
    Sleep(1000);
    ui->statusBar->showMessage("");
}


void MainWindow::on_shiftedit_datetime1_dateTimeChanged(const QDateTime &dateTime)
{
    QDateTime x = dateTime;
    shiftedit_length();
}
void MainWindow::on_shiftedit_datetime2_dateTimeChanged(const QDateTime &dateTime)
{
    QDateTime x = dateTime;
    shiftedit_length();
}



void MainWindow::on_shiftedit_checkBox1_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox1->checkState()==2)
    {
        ui->shiftedit_hbox2->show();
        update_shiftedit_combobox1_1();

    }
    else if(ui->shiftedit_checkBox1->checkState()==0)
    {

        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox1_1->setModel(modal);
        ui->shiftedit_spinbox1_1->setValue(0);
        ui->shiftedit_spinbox1_2->setValue(0);
        ui->shiftedit_checkBox2->setChecked(false);

        ui->shiftedit_hbox2->hide();
    }
}
void MainWindow::update_shiftedit_combobox1_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox1_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox1_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox1_2();
}
void MainWindow::update_shiftedit_combobox1_2()
{
    QString projectName = ui->shiftedit_comboBox1_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox1_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox1_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox1_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}


void MainWindow::on_shiftedit_checkBox2_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox2->checkState()==2)
    {
        update_shiftedit_combobox2_1();
        ui->shiftedit_hbox3->show();
    }
    else if(ui->shiftedit_checkBox2->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox2_1->setModel(modal);
        ui->shiftedit_spinbox2_1->setValue(0);
        ui->shiftedit_spinbox2_2->setValue(0);
        ui->shiftedit_checkBox3->setChecked(false);

        ui->shiftedit_hbox3->hide();
    }
}
void MainWindow::update_shiftedit_combobox2_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox2_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox2_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox2_2();
}
void MainWindow::update_shiftedit_combobox2_2()
{
    QString projectName = ui->shiftedit_comboBox2_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox2_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox2_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox2_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}


void MainWindow::on_shiftedit_checkBox3_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox3->checkState()==2)
    {
        update_shiftedit_combobox3_1();
        ui->shiftedit_hbox4->show();
    }
    else if(ui->shiftedit_checkBox3->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox3_1->setModel(modal);
        ui->shiftedit_spinbox3_1->setValue(0);
        ui->shiftedit_spinbox3_2->setValue(0);
        ui->shiftedit_checkBox4->setChecked(false);

        ui->shiftedit_hbox4->hide();
    }
}
void MainWindow::update_shiftedit_combobox3_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox3_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox3_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox3_2();
}
void MainWindow::update_shiftedit_combobox3_2()
{
    QString projectName = ui->shiftedit_comboBox3_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox3_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox3_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox3_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox4_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox4->checkState()==2)
    {
        update_shiftedit_combobox4_1();
        ui->shiftedit_hbox5->show();
    }
    else if(ui->shiftedit_checkBox4->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox4_1->setModel(modal);
        ui->shiftedit_spinbox4_1->setValue(0);
        ui->shiftedit_spinbox4_2->setValue(0);
        ui->shiftedit_checkBox5->setChecked(false);


        ui->shiftedit_hbox5->hide();
    }
}
void MainWindow::update_shiftedit_combobox4_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox4_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox4_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox4_2();
}
void MainWindow::update_shiftedit_combobox4_2()
{
    QString projectName = ui->shiftedit_comboBox4_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox4_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox4_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox4_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox5_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox5->checkState()==2)
    {
        update_shiftedit_combobox5_1();
        ui->shiftedit_hbox6->show();
    }
    else if(ui->shiftedit_checkBox5->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox5_1->setModel(modal);
        ui->shiftedit_spinbox5_1->setValue(0);
        ui->shiftedit_spinbox5_2->setValue(0);
        ui->shiftedit_checkBox6->setChecked(false);

        ui->shiftedit_hbox6->hide();
    }
}
void MainWindow::update_shiftedit_combobox5_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox5_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox5_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox5_2();
}
void MainWindow::update_shiftedit_combobox5_2()
{
    QString projectName = ui->shiftedit_comboBox5_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox5_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox5_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox5_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox6_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox6->checkState()==2)
    {
        update_shiftedit_combobox6_1();
        ui->shiftedit_hbox7->show();
    }
    else if(ui->shiftedit_checkBox6->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox6_1->setModel(modal);
        ui->shiftedit_spinbox6_1->setValue(0);
        ui->shiftedit_spinbox6_2->setValue(0);
        ui->shiftedit_checkBox7->setChecked(false);

        ui->shiftedit_hbox7->hide();
    }
}
void MainWindow::update_shiftedit_combobox6_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox6_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox6_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox6_2();
}
void MainWindow::update_shiftedit_combobox6_2()
{
    QString projectName = ui->shiftedit_comboBox6_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox6_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox6_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox6_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox7_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox7->checkState()==2)
    {
        update_shiftedit_combobox7_1();
        ui->shiftedit_hbox8->show();
    }
    else if(ui->shiftedit_checkBox7->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox7_1->setModel(modal);
        ui->shiftedit_spinbox7_1->setValue(0);
        ui->shiftedit_spinbox7_2->setValue(0);
        ui->shiftedit_checkBox8->setChecked(false);

        ui->shiftedit_hbox8->hide();
    }
}
void MainWindow::update_shiftedit_combobox7_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox7_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox7_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox7_2();
}
void MainWindow::update_shiftedit_combobox7_2()
{
    QString projectName = ui->shiftedit_comboBox7_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox7_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox7_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox7_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox8_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox8->checkState()==2)
    {
        update_shiftedit_combobox8_1();
        ui->shiftedit_hbox9->show();
    }
    else if(ui->shiftedit_checkBox8->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox8_1->setModel(modal);
        ui->shiftedit_spinbox8_1->setValue(0);
        ui->shiftedit_spinbox8_2->setValue(0);
        ui->shiftedit_checkBox9->setChecked(false);

        ui->shiftedit_hbox9->hide();
    }
}
void MainWindow::update_shiftedit_combobox8_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox8_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox8_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox8_2();
}
void MainWindow::update_shiftedit_combobox8_2()
{
    QString projectName = ui->shiftedit_comboBox8_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox8_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox8_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox8_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox9_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox9->checkState()==2)
    {
        update_shiftedit_combobox9_1();
        ui->shiftedit_hbox10->show();
    }
    else if(ui->shiftedit_checkBox9->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox9_1->setModel(modal);
        ui->shiftedit_spinbox9_1->setValue(0);
        ui->shiftedit_spinbox9_2->setValue(0);
        ui->shiftedit_checkBox10->setChecked(false);

        ui->shiftedit_hbox10->hide();
    }
}
void MainWindow::update_shiftedit_combobox9_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox9_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox9_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox9_2();
}
void MainWindow::update_shiftedit_combobox9_2()
{
    QString projectName = ui->shiftedit_comboBox9_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox9_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox9_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox9_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox10_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox10->checkState()==2)
    {
        update_shiftedit_combobox10_1();
        ui->shiftedit_hbox11->show();
    }
    else if(ui->shiftedit_checkBox10->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox10_1->setModel(modal);
        ui->shiftedit_spinbox10_1->setValue(0);
        ui->shiftedit_spinbox10_2->setValue(0);
        ui->shiftedit_checkBox11->setChecked(false);

        ui->shiftedit_hbox11->hide();
    }
}
void MainWindow::update_shiftedit_combobox10_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox10_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox10_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox10_2();
}
void MainWindow::update_shiftedit_combobox10_2()
{
    QString projectName = ui->shiftedit_comboBox10_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox10_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox10_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox10_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox11_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox11->checkState()==2)
    {
        update_shiftedit_combobox11_1();
        ui->shiftedit_hbox12->show();
    }
    else if(ui->shiftedit_checkBox11->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox11_1->setModel(modal);
        ui->shiftedit_spinbox11_1->setValue(0);
        ui->shiftedit_spinbox11_2->setValue(0);
        ui->shiftedit_checkBox12->setChecked(false);

        ui->shiftedit_hbox12->hide();
    }
}
void MainWindow::update_shiftedit_combobox11_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox11_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox11_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox11_2();
}
void MainWindow::update_shiftedit_combobox11_2()
{
    QString projectName = ui->shiftedit_comboBox11_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox11_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox11_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox11_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_checkBox12_stateChanged(int arg1)
{
    arg1++;
    if(ui->shiftedit_checkBox12->checkState()==2)
    {
        update_shiftedit_combobox12_1();

    }
    else if(ui->shiftedit_checkBox12->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->shiftedit_comboBox12_1->setModel(modal);
        ui->shiftedit_spinbox12_1->setValue(0);
        ui->shiftedit_spinbox12_2->setValue(0);
    }
}
void MainWindow::update_shiftedit_combobox12_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox12_1->setModel(modal);
}
void MainWindow::on_shiftedit_comboBox12_1_currentIndexChanged(const QString &arg1)
{
    QString x =arg1;
    update_shiftedit_combobox12_2();
}
void MainWindow::update_shiftedit_combobox12_2()
{
    QString projectName = ui->shiftedit_comboBox12_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->shiftedit_comboBox12_2->setModel(modal);
}
void MainWindow::on_shiftedit_spinbox12_1_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}
void MainWindow::on_shiftedit_spinbox12_2_valueChanged(int arg1)
{
    shiftedit_remain_length();
    arg1++;
}

void MainWindow::on_shiftedit_spinbox_lunch_valueChanged(int arg1)
{
    shiftedit_remain_length();
}


















//Clockout Classes
void MainWindow::clockout_initialize()
{
    ui->stackedWidget->setCurrentIndex(3);

    shift_length();
    remaining_length();


    ui->hbox2->hide();
    ui->hbox3->hide();
    ui->hbox4->hide();
    ui->hbox5->hide();
    ui->hbox6->hide();
    ui->hbox7->hide();
    ui->hbox8->hide();
    ui->hbox9->hide();
    ui->hbox10->hide();
    ui->hbox11->hide();
    ui->hbox12->hide();


}
void MainWindow::shift_length()
{
    QSqlQuery qry(employeeDataBase), qry1(employeeDataBase);
    QDateTime unformatted_clockout = QDateTime::currentDateTime();
    QDateTime clockout = format_datetimes(unformatted_clockout);
    QString time = clockout.toString("yyyy-MM-dd HH:mm:ss");


    qry1.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");
    QString shiftcount;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            shiftcount = qry1.value(0).toString();
        }
    }

    qry.prepare("select clockin from '"+id+"' where shiftnumber='"+shiftcount+"'");
    QString clockinString;
    if(qry.exec())
    {
        while(qry.next())
        {
            clockinString = qry.value(0).toString();
        }
    }

    QDateTime clockin=QDateTime::fromString(clockinString,"yyyy-MM-dd HH:mm:ss");
    int secs = clockin.secsTo(clockout);
    int hours = secs/3600;
    int minutes = secs%3600/60;
    length_of_shift = QString::number(hours)+":"+QString::number(minutes);
    qDebug()<<shiftcount<< " "<<clockout<<" "<<clockin;
    ui->clockout_label_3->setText(length_of_shift);
}
void MainWindow::remaining_length()
{
    QSqlQuery qry(employeeDataBase), qry1(employeeDataBase);
    QDateTime unformatted_clockout = QDateTime::currentDateTime();
    QDateTime clockout = format_datetimes(unformatted_clockout);
    QString time = clockout.toString("yyyy-MM-dd HH:mm:ss");


    qry1.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");
    QString shiftcount;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            shiftcount = qry1.value(0).toString();
        }
    }

    qry.prepare("select clockin from '"+id+"' where shiftnumber='"+shiftcount+"'");
    QString clockinString;
    if(qry.exec())
    {
        while(qry.next())
        {
            clockinString = qry.value(0).toString();
        }
    }

    QDateTime clockin=QDateTime::fromString(clockinString,"yyyy-MM-dd HH:mm:ss");
    int secs = clockin.secsTo(clockout);
    int totalmins = secs/60;
    int remainingmins = 0;


    remainingmins+=60*ui->clockout_spinbox1_1->value();
    remainingmins+=60*ui->clockout_spinbox2_1->value();
    remainingmins+=60*ui->clockout_spinbox3_1->value();
    remainingmins+=60*ui->clockout_spinbox4_1->value();
    remainingmins+=60*ui->clockout_spinbox5_1->value();
    remainingmins+=60*ui->clockout_spinbox6_1->value();
    remainingmins+=60*ui->clockout_spinbox7_1->value();
    remainingmins+=60*ui->clockout_spinbox8_1->value();
    remainingmins+=60*ui->clockout_spinbox9_1->value();
    remainingmins+=60*ui->clockout_spinbox10_1->value();
    remainingmins+=60*ui->clockout_spinbox11_1->value();
    remainingmins+=60*ui->clockout_spinbox12_1->value();

    remainingmins+=ui->clockout_spinbox1_2->value();
    remainingmins+=ui->clockout_spinbox2_2->value();
    remainingmins+=ui->clockout_spinbox3_2->value();
    remainingmins+=ui->clockout_spinbox4_2->value();
    remainingmins+=ui->clockout_spinbox5_2->value();
    remainingmins+=ui->clockout_spinbox6_2->value();
    remainingmins+=ui->clockout_spinbox7_2->value();
    remainingmins+=ui->clockout_spinbox8_2->value();
    remainingmins+=ui->clockout_spinbox9_2->value();
    remainingmins+=ui->clockout_spinbox10_2->value();
    remainingmins+=ui->clockout_spinbox11_2->value();
    remainingmins+=ui->clockout_spinbox12_2->value();

    int lunchmins = ui->clockout_spinbox_lunch->value();
    int finalmins = totalmins-remainingmins-lunchmins;

    int hours=finalmins/60;
    int minutes=finalmins%60;
    QString remaining_length_of_shift = QString::number(hours)+":"+QString::number(minutes);
    //qDebug()<<shiftcount<< " "<<clockout<<" "<<clockin;
    ui->clockout_label_4->setText(remaining_length_of_shift);

}
void MainWindow::on_clockout_finished_clicked()
{
    QString remaining_time = ui->clockout_label_4->text();
    int hours = remaining_time.split(":")[0].toInt();
    int minutes = remaining_time.split(":")[1].toInt();
    if(hours<0)
    {
        ui->statusBar->showMessage("You Over-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if (hours>0)
    {
        ui->statusBar->showMessage("You Under-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(minutes<0)
    {
        ui->statusBar->showMessage("You Over-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if(minutes>0)
    {
        ui->statusBar->showMessage("You Under-allocated Time");
        Sleep(1000);
        ui->statusBar->showMessage("");
    }
    else if (minutes==0&&hours==0)
    {
        QSqlQuery qry(employeeDataBase), qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase),qry4(employeeDataBase);
        QDateTime unformatted_clockout = QDateTime::currentDateTime();
        QDateTime clockout = format_datetimes(unformatted_clockout);
        QString time = clockout.toString("yyyy-MM-dd HH:mm:ss");
        qry1.prepare("SELECT shiftcount FROM employeelist WHERE id = '"+id+"'");
        QString shiftcount;
        if(qry1.exec())
        {
            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }
        qry.prepare("select clockin from '"+id+"' where shiftnumber='"+shiftcount+"'");
        QString clockinString;
        if(qry.exec())
        {
            while(qry.next())
            {
                clockinString = qry.value(0).toString();
            }
        }
        QDateTime clockin=QDateTime::fromString(clockinString);
        int secs = clockin.secsTo(clockout);
        int hours = secs/3600;
        int minutes = secs%3600/60;
        QString length = QString::number(hours)+":"+QString::number(minutes);
        if(minutes==0)
            QString length = QString::number(hours)+":"+QString::number(minutes)+"0";
        else
            QString length = QString::number(hours)+":"+QString::number(minutes);
        int shiftcountInt = shiftcount.toInt();
        shiftcount = QString::number(shiftcountInt);


        QString lunchTime = QString::number(ui->clockout_spinbox_lunch->value());


        QString one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve;

        QSqlQuery projectQry(projectDataBase),itemQry(projectDataBase);
        if(ui->clockout_checkBox1->checkState()==2)
        {
            QString project1 = ui->clockout_comboBox1_1->currentText();
            QString item1 = ui->clockout_comboBox1_2->currentText();
            QString hour1 = ui->clockout_spinbox1_1->text();
            QString minute1 = ui->clockout_spinbox1_2->text();



            QString project1id;
            projectQry.prepare("Select id from projectlist where name ='"+project1+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project1id = projectQry.value(0).toString();
                }
            }
            QString item1id;

            itemQry.prepare("Select id from '"+project1id+"' where name='"+item1+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item1id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            one = project1id+","+item1id+","+hour1+","+minute1;

        }
        else
        {
            one = "Na";
        }

        if(ui->clockout_checkBox2->checkState()==2)
        {
            QString project2 = ui->clockout_comboBox2_1->currentText();
            QString item2 = ui->clockout_comboBox2_2->currentText();
            QString hour2 = ui->clockout_spinbox2_1->text();
            QString minute2 = ui->clockout_spinbox2_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project2id;
            projectQry.prepare("Select id from projectlist where name ='"+project2+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project2id = projectQry.value(0).toString();
                }
            }
            QString item2id;
            QString item2_1 = item2.split(" ")[0];
            QString item2_2 = item2.split(" ")[1];
            QString item2_3 = item2.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item2_1+"' and sub='"+item2_2+"' and dim='"+item2_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item2id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            two = project2id+","+item2id+","+hour2+","+minute2;
        }
        else
        {
            two="Na";
        }

        if(ui->clockout_checkBox3->checkState()==2)
        {
            QString project3 = ui->clockout_comboBox3_1->currentText();
            QString item3 = ui->clockout_comboBox3_2->currentText();
            QString hour3 = ui->clockout_spinbox3_1->text();
            QString minute3 = ui->clockout_spinbox3_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project3id;
            projectQry.prepare("Select id from projectlist where name ='"+project3+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project3id = projectQry.value(0).toString();
                }
            }
            QString item3id;
            QString item3_1 = item3.split(" ")[0];
            QString item3_2 = item3.split(" ")[1];
            QString item3_3 = item3.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item3_1+"' and sub='"+item3_2+"' and dim='"+item3_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item3id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            three = project3id+","+item3id+","+hour3+","+minute3;
        }
        else
        {
            three="Na";
        }

        if(ui->clockout_checkBox4->checkState()==2)
        {
            QString project4 = ui->clockout_comboBox4_1->currentText();
            QString item4 = ui->clockout_comboBox4_2->currentText();
            QString hour4 = ui->clockout_spinbox4_1->text();
            QString minute4 = ui->clockout_spinbox4_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project4id;
            projectQry.prepare("Select id from projectlist where name ='"+project4+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project4id = projectQry.value(0).toString();
                }
            }
            QString item4id;
            QString item4_1 = item4.split(" ")[0];
            QString item4_2 = item4.split(" ")[1];
            QString item4_3 = item4.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item4_1+"' and sub='"+item4_2+"' and dim='"+item4_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item4id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            four = project4id+","+item4id+","+hour4+","+minute4;
        }
        else
        {
            four="Na";
        }

        if(ui->clockout_checkBox5->checkState()==2)
        {
            QString project5 = ui->clockout_comboBox5_1->currentText();
            QString item5 = ui->clockout_comboBox5_2->currentText();
            QString hour5 = ui->clockout_spinbox5_1->text();
            QString minute5 = ui->clockout_spinbox5_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project5id;
            projectQry.prepare("Select id from projectlist where name ='"+project5+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project5id = projectQry.value(0).toString();
                }
            }
            QString item5id;
            QString item5_1 = item5.split(" ")[0];
            QString item5_2 = item5.split(" ")[1];
            QString item5_3 = item5.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item5_1+"' and sub='"+item5_2+"' and dim='"+item5_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item5id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            five = project5id+","+item5id+","+hour5+","+minute5;
        }
        else
        {
            five="Na";
        }

        if(ui->clockout_checkBox6->checkState()==2)
        {
            QString project6 = ui->clockout_comboBox6_1->currentText();
            QString item6 = ui->clockout_comboBox6_2->currentText();
            QString hour6 = ui->clockout_spinbox6_1->text();
            QString minute6 = ui->clockout_spinbox6_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project6id;
            projectQry.prepare("Select id from projectlist where name ='"+project6+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project6id = projectQry.value(0).toString();
                }
            }
            QString item6id;
            QString item6_1 = item6.split(" ")[0];
            QString item6_2 = item6.split(" ")[1];
            QString item6_3 = item6.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item6_1+"' and sub='"+item6_2+"' and dim='"+item6_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item6id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            six = project6id+","+item6id+","+hour6+","+minute6;
        }
        else
        {
            six="Na";
        }


        if(ui->clockout_checkBox7->checkState()==2)
        {
            QString project7 = ui->clockout_comboBox7_1->currentText();
            QString item7 = ui->clockout_comboBox7_2->currentText();
            QString hour7 = ui->clockout_spinbox7_1->text();
            QString minute7 = ui->clockout_spinbox7_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project7id;
            projectQry.prepare("Select id from projectlist where name ='"+project7+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project7id = projectQry.value(0).toString();
                }
            }
            QString item7id;
            QString item7_1 = item7.split(" ")[0];
            QString item7_2 = item7.split(" ")[1];
            QString item7_3 = item7.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item7_1+"' and sub='"+item7_2+"' and dim='"+item7_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item7id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            seven = project7id+","+item7id+","+hour7+","+minute7;
        }
        else
        {
            seven="Na";
        }

        if(ui->clockout_checkBox8->checkState()==2)
        {
            QString project8 = ui->clockout_comboBox8_1->currentText();
            QString item8 = ui->clockout_comboBox8_2->currentText();
            QString hour8 = ui->clockout_spinbox8_1->text();
            QString minute8 = ui->clockout_spinbox8_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project8id;
            projectQry.prepare("Select id from projectlist where name ='"+project8+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project8id = projectQry.value(0).toString();
                }
            }
            QString item8id;
            QString item8_1 = item8.split(" ")[0];
            QString item8_2 = item8.split(" ")[1];
            QString item8_3 = item8.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item8_1+"' and sub='"+item8_2+"' and dim='"+item8_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item8id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            eight = project8id+","+item8id+","+hour8+","+minute8;
        }
        else
        {
            eight="Na";
        }

        if(ui->clockout_checkBox9->checkState()==2)
        {
            QString project9 = ui->clockout_comboBox9_1->currentText();
            QString item9 = ui->clockout_comboBox9_2->currentText();
            QString hour9 = ui->clockout_spinbox9_1->text();
            QString minute9 = ui->clockout_spinbox9_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project9id;
            projectQry.prepare("Select id from projectlist where name ='"+project9+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project9id = projectQry.value(0).toString();
                }
            }
            QString item9id;
            QString item9_1 = item9.split(" ")[0];
            QString item9_2 = item9.split(" ")[1];
            QString item9_3 = item9.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item9_1+"' and sub='"+item9_2+"' and dim='"+item9_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item9id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            nine = project9id+","+item9id+","+hour9+","+minute9;
        }
        else
        {
            nine="Na";
        }

        if(ui->clockout_checkBox10->checkState()==2)
        {
            QString project10 = ui->clockout_comboBox10_1->currentText();
            QString item10 = ui->clockout_comboBox10_2->currentText();
            QString hour10 = ui->clockout_spinbox10_1->text();
            QString minute10 = ui->clockout_spinbox10_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project10id;
            projectQry.prepare("Select id from projectlist where name ='"+project10+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project10id = projectQry.value(0).toString();
                }
            }
            QString item10id;
            QString item10_1 = item10.split(" ")[0];
            QString item10_2 = item10.split(" ")[1];
            QString item10_3 = item10.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item10_1+"' and sub='"+item10_2+"' and dim='"+item10_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item10id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            ten = project10id+","+item10id+","+hour10+","+minute10;
        }
        else
        {
            ten="Na";
        }

        if(ui->clockout_checkBox11->checkState()==2)
        {
            QString project11 = ui->clockout_comboBox11_1->currentText();
            QString item11 = ui->clockout_comboBox11_2->currentText();
            QString hour11 = ui->clockout_spinbox11_1->text();
            QString minute11 = ui->clockout_spinbox11_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project11id;
            projectQry.prepare("Select id from projectlist where name ='"+project11+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project11id = projectQry.value(0).toString();
                }
            }
            QString item11id;
            QString item11_1 = item11.split(" ")[0];
            QString item11_2 = item11.split(" ")[1];
            QString item11_3 = item11.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item11_1+"' and sub='"+item11_2+"' and dim='"+item11_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item11id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            eleven = project11id+","+item11id+","+hour11+","+minute11;
        }
        else
        {
            eleven="Na";
        }

        if(ui->clockout_checkBox12->checkState()==2)
        {
            QString project12 = ui->clockout_comboBox12_1->currentText();
            QString item12 = ui->clockout_comboBox12_2->currentText();
            QString hour12 = ui->clockout_spinbox12_1->text();
            QString minute12 = ui->clockout_spinbox12_2->text();
            projectQry.clear();
            itemQry.clear();
            QString project12id;
            projectQry.prepare("Select id from projectlist where name ='"+project12+"'");
            if(projectQry.exec())
            {
                while(projectQry.next())
                {
                    project12id = projectQry.value(0).toString();
                }
            }
            QString item12id;
            QString item12_1 = item12.split(" ")[0];
            QString item12_2 = item12.split(" ")[1];
            QString item12_3 = item12.split(" ")[2];
            itemQry.prepare("Select id from itemlist where cate='"+item12_1+"' and sub='"+item12_2+"' and dim='"+item12_3+"'");
            if(itemQry.exec())
            {
                while(itemQry.next())
                {
                    item12id = itemQry.value(0).toString();
                }
            }
            else{
                ui->statusBar->showMessage(itemQry.lastError().text());
                Sleep(1000);
                ui->statusBar->showMessage("");
            }
            twelve = project12id+","+item12id+","+hour12+","+minute12;
        }
        else
        {
            twelve="Na";
        }






        // Inserting clockin time and shiftnumber into pin.
        qry4.prepare("update '"+id+"' set clockout='"+time+"',lunch='"+lunchTime+"',one = '"+one+"',two = '"+two+"',three = '"+three+"',four = '"+four+"',five = '"+five+"'"
           ",six = '"+six+"',seven = '"+seven+"',eight = '"+eight+"',nine = '"+nine+"',ten = '"+ten+"',eleven = '"+eleven+"',twelve = '"+twelve+"'  where shiftnumber = '"+shiftcount+"'");
        if(qry4.exec())
        {

            qry2.prepare("update employeelist set active=0 where id = '"+id+"'");
            qry2.exec();


            ui->clockout_checkBox1->setChecked(false);
            ui->clockout_spinbox1_1->setValue(0);
            ui->clockout_spinbox1_2->setValue(0);



            QSqlQuery Return(employeeDataBase);
            Return.prepare("SELECT adminstatus FROM employeelist WHERE id = '"+id+"'");
            QString status;
            if(Return.exec())
            {
                while(Return.next())
                {
                    status = Return.value(0).toString();
                }
            }
            if(status == "0")
            {
                employee_initialize();
            }
            else if(status == "1")
            {
                admin_initialize();
            }
            ui->statusBar->showMessage("Clockout Successful");
            Sleep(1000);
            ui->statusBar->showMessage("");

        }
        else
        {
            QSqlQuery Return(employeeDataBase);
            Return.prepare("SELECT adminstatus FROM employeelist WHERE pin = '"+pin+"'");
            QString status;
            if(Return.exec())
            {
                while(Return.next())
                {
                    status = Return.value(0).toString();
                }
            }
            if(status == "0")
            {
                employee_initialize();
            }
            else if(status == "1")
            {
                admin_initialize();
            }
            ui->statusBar->showMessage("Error4::" +qry4.lastError().text());
            Sleep(1000);
            ui->statusBar->showMessage("");
        }
    }


}
QDateTime MainWindow::format_datetimes(QDateTime z)
{
    int minTime = z.time().minute();
    int hourTime =z.time().hour();
    int dayOfMonth = z.date().daysInMonth();
    int dayOfYear = z.date().dayOfYear();
    if(minTime<7&&minTime>=0)
    {
        QTime x(z.time().hour(),0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=7&&minTime<23)
    {
        QTime x(z.time().hour(),15,0);
        QDate y(z.date());
        QDateTime n(y,x);
        z=n;
    }
    else if(minTime>=23&&minTime<37)
    {
        QTime x(z.time().hour(),30,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=37&&minTime<53)
    {
        QTime x(z.time().hour(),45,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23 && z.date().day()==dayOfMonth&& z.date().daysInYear()==dayOfYear)
    {
        z.date().addYears(1);
        z.date().addDays(1);
        z.date().addMonths(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23 && z.date().day()==dayOfMonth)
    {
        z.date().addDays(1);
        z.date().addMonths(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53 && hourTime==23)
    {
        z.date().addDays(1);
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    else if(minTime>=53)
    {
        QTime x(z.time().hour()+1,0,0);
        QDateTime n(z.date(),x);
        z=n;
    }
    return z;

}
void MainWindow::on_clockout_cancel_clicked()
{
    QSqlQuery Return(employeeDataBase);
    ui->clockout_checkBox1->setChecked(false);
    ui->clockout_spinbox1_1->setValue(0);
    ui->clockout_spinbox1_2->setValue(0);
    Return.prepare("SELECT adminstatus FROM employeelist WHERE pin = '"+pin+"'");
    QString status;
    if(Return.exec())
    {
        while(Return.next())
        {
            status = Return.value(0).toString();
        }
    }
    if(status == "0")
    {
        ui->stackedWidget->setCurrentIndex(2);
    }
    else if(status == "1")
    {
        admin_initialize();
    }
    ui->statusBar->showMessage("Clockout Canceled");
    Sleep(1000);
    ui->statusBar->showMessage("");
}


void MainWindow::on_clockout_checkBox1_stateChanged(int arg1)
{
    arg1++;
    qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox1->checkState()==2)
    {
        update_clockout_comboBox1_1();
        ui->hbox2->show();
    }
    else if(ui->clockout_checkBox1->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox1_1->setModel(modal);
        ui->clockout_spinbox1_1->setValue(0);
        ui->clockout_spinbox1_2->setValue(0);
        ui->clockout_checkBox2->setChecked(false);

        ui->hbox2->hide();
    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox1_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox1_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox1_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox1_2();
}
void MainWindow::update_clockout_comboBox1_2()
{
    QString projectName = ui->clockout_comboBox1_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox1_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox1_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox1_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox2_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox2->checkState()==2)
    {
        update_clockout_comboBox2_1();
        ui->hbox3->show();
    }
    else if(ui->clockout_checkBox2->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox2_1->setModel(modal);
        ui->clockout_spinbox2_1->setValue(0);
        ui->clockout_spinbox2_2->setValue(0);
        ui->clockout_checkBox3->setChecked(false);
        ui->hbox3->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox2_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox2_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox2_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox2_2();
}
void MainWindow::update_clockout_comboBox2_2()
{
    QString projectName = ui->clockout_comboBox2_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox2_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox2_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox2_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox3_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox3->checkState()==2)
    {
        update_clockout_comboBox3_1();
        ui->hbox4->show();
    }
    else if(ui->clockout_checkBox3->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox3_1->setModel(modal);
        ui->clockout_spinbox3_1->setValue(0);
        ui->clockout_spinbox3_2->setValue(0);
        ui->clockout_checkBox4->setChecked(false);
        ui->hbox4->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox3_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox3_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox3_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox3_2();
}
void MainWindow::update_clockout_comboBox3_2()
{
    QString projectName = ui->clockout_comboBox3_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox3_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox3_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox3_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox4_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox4->checkState()==2)
    {
        update_clockout_comboBox4_1();
        ui->hbox5->show();
    }
    else if(ui->clockout_checkBox4->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox4_1->setModel(modal);
        ui->clockout_spinbox4_1->setValue(0);
        ui->clockout_spinbox4_2->setValue(0);
        ui->clockout_checkBox5->setChecked(false);
        ui->hbox5->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox4_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox4_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox4_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox4_2();
}
void MainWindow::update_clockout_comboBox4_2()
{
    QString projectName = ui->clockout_comboBox4_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox4_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox4_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox4_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox5_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox5->checkState()==2)
    {
        update_clockout_comboBox5_1();
        ui->hbox6->show();
    }
    else if(ui->clockout_checkBox5->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox5_1->setModel(modal);
        ui->clockout_spinbox5_1->setValue(0);
        ui->clockout_spinbox5_2->setValue(0);
        ui->clockout_checkBox6->setChecked(false);
        ui->hbox6->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox5_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox5_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox5_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox5_2();
}
void MainWindow::update_clockout_comboBox5_2()
{
    QString projectName = ui->clockout_comboBox5_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox5_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox5_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox5_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox6_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox6->checkState()==2)
    {
        update_clockout_comboBox6_1();
        ui->hbox7->show();
    }
    else if(ui->clockout_checkBox6->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox6_1->setModel(modal);
        ui->clockout_spinbox6_1->setValue(0);
        ui->clockout_spinbox6_2->setValue(0);
        ui->clockout_checkBox7->setChecked(false);
        ui->hbox7->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox6_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox6_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox6_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox6_2();
}
void MainWindow::update_clockout_comboBox6_2()
{
    QString projectName = ui->clockout_comboBox6_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox6_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox6_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox6_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox7_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox7->checkState()==2)
    {
        update_clockout_comboBox7_1();
        ui->hbox8->show();
    }
    else if(ui->clockout_checkBox7->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox7_1->setModel(modal);
        ui->clockout_spinbox7_1->setValue(0);
        ui->clockout_spinbox7_2->setValue(0);
        ui->clockout_checkBox8->setChecked(false);
        ui->hbox8->hide();
    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox7_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox7_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox7_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox7_2();
}
void MainWindow::update_clockout_comboBox7_2()
{
    QString projectName = ui->clockout_comboBox7_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox7_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox7_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox7_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox8_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox8->checkState()==2)
    {
        update_clockout_comboBox8_1();
        ui->hbox9->show();
    }
    else if(ui->clockout_checkBox8->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox8_1->setModel(modal);
        ui->clockout_spinbox8_1->setValue(0);
        ui->clockout_spinbox8_2->setValue(0);
        ui->clockout_checkBox9->setChecked(false);
        ui->hbox9->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox8_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox8_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox8_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox8_2();
}
void MainWindow::update_clockout_comboBox8_2()
{
    QString projectName = ui->clockout_comboBox8_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox8_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox8_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox8_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox9_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox9->checkState()==2)
    {
        update_clockout_comboBox9_1();
        ui->hbox10->show();
    }
    else if(ui->clockout_checkBox9->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox9_1->setModel(modal);
        ui->clockout_spinbox9_1->setValue(0);
        ui->clockout_spinbox9_2->setValue(0);
        ui->clockout_checkBox10->setChecked(false);
        ui->hbox10->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox9_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox9_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox9_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox9_2();
}
void MainWindow::update_clockout_comboBox9_2()
{
    QString projectName = ui->clockout_comboBox9_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox9_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox9_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox9_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox10_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox10->checkState()==2)
    {
        update_clockout_comboBox10_1();
        ui->hbox11->show();
    }
    else if(ui->clockout_checkBox10->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox10_1->setModel(modal);
        ui->clockout_spinbox10_1->setValue(0);
        ui->clockout_spinbox10_2->setValue(0);
        ui->clockout_checkBox11->setChecked(false);
        ui->hbox11->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox10_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox10_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox10_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox10_2();
}
void MainWindow::update_clockout_comboBox10_2()
{
    QString projectName = ui->clockout_comboBox10_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox10_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox10_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox10_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox11_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox11->checkState()==2)
    {
        update_clockout_comboBox11_1();
        ui->hbox12->show();
    }
    else if(ui->clockout_checkBox11->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox11_1->setModel(modal);
        ui->clockout_spinbox11_1->setValue(0);
        ui->clockout_spinbox11_2->setValue(0);
        ui->clockout_checkBox12->setChecked(false);
        ui->hbox12->hide();

    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox11_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox11_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox11_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox11_2();
}
void MainWindow::update_clockout_comboBox11_2()
{
    QString projectName = ui->clockout_comboBox11_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox11_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox11_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox11_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_checkBox12_stateChanged(int arg1)
{
    arg1++;
    //qDebug()<<QString::number(ui->clockout_checkBox1->checkState());
    if(ui->clockout_checkBox12->checkState()==2)
    {
        update_clockout_comboBox12_1();
    }
    else if(ui->clockout_checkBox12->checkState()==0)
    {
        QSqlQueryModel * modal=new QSqlQueryModel();
        ui->clockout_comboBox12_1->setModel(modal);
        ui->clockout_spinbox12_1->setValue(0);
        ui->clockout_spinbox12_2->setValue(0);


    }
    remaining_length();
}
void MainWindow::update_clockout_comboBox12_1()
{
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from projectlist");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox12_1->setModel(modal);
}
void MainWindow::on_clockout_comboBox12_1_currentIndexChanged(const QString &arg1)
{
    QString x = arg1;
    update_clockout_comboBox12_2();
}
void MainWindow::update_clockout_comboBox12_2()
{
    QString projectName = ui->clockout_comboBox12_1->currentText();
    QSqlQuery qry1(projectDataBase);
    //qDebug()<<projectName;
    qry1.prepare("select id from projectlist where name='"+projectName+"'");
    QString projectId;
    if(qry1.exec())
    {
        while(qry1.next())
        {
            projectId = qry1.value(0).toString();
        }
    }
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(projectDataBase);
    qry->prepare("select name from '"+projectId+"'");
    qry->exec();
    modal->setQuery(*qry);
    ui->clockout_comboBox12_2->setModel(modal);
}
void MainWindow::on_clockout_spinbox12_1_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}
void MainWindow::on_clockout_spinbox12_2_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}

void MainWindow::on_clockout_spinbox_lunch_valueChanged(int arg1)
{
    remaining_length();
    arg1++;
}












void MainWindow::creatingTable()
{
    QString x[5];
    int i =0;
    QSqlQuery qry(employeeDataBase),qry1(employeeDataBase),qry2(employeeDataBase),qry3(employeeDataBase),qry4(employeeDataBase),qry5(employeeDataBase);
    qry.prepare("SELECT index FROM employeelist");
    if(qry.exec())
    {
        while(qry.next())
        {

            x[i] = qry.value(0).toString();
            i++;
        }
    }
    qry1.exec("CREATE TABLE '"+x[1]+"'"
               "(clockin DATETIME,clockout DATETIME, length VARCHAR, lunch VARCHAR, shiftnumber integer)");
    qry2.exec("CREATE TABLE '"+x[2]+"'"
               "(clockin DATETIME,clockout DATETIME, length VARCHAR, lunch VARCHAR, shiftnumber integer)");
    qry3.exec("CREATE TABLE '"+x[3]+"'"
               "(clockin DATETIME,clockout DATETIME, length VARCHAR, lunch VARCHAR, shiftnumber integer)");
    qry4.exec("CREATE TABLE '"+x[4]+"'"
               "(clockin DATETIME,clockout DATETIME, length VARCHAR, lunch VARCHAR, shiftnumber integer)");
    qry5.exec("CREATE TABLE '"+x[5]+"'"
               "(clockin DATETIME,clockout DATETIME, length VARCHAR, lunch VARCHAR, shiftnumber integer)");
}





















