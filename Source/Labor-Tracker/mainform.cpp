#include "mainform.h"
#include "ui_mainform.h"

MainForm::MainForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::MainForm)
{
    Connect();
    ui->setupUi(this);


    clockoutForm = new ClockoutForm(this);
    clockoutForm->hide();
    ui->mainStack->setCurrentIndex(0);
    loginForm = new LoginForm(this);
    loginForm->hide();
    loginInitialize();
    shifteditform = new ShiftEditForm(this);
    shifteditform->hide();


    establishConnections();
}

MainForm::~MainForm()
{
    delete ui;
}
void MainForm::Connect()
{

    projectDataBase = QSqlDatabase::addDatabase("QSQLITE","projectDataBase");
    employeeDataBase = QSqlDatabase::addDatabase("QSQLITE","employeeDataBase");
    data = employeeDataBase = QSqlDatabase::addDatabase("QSQLITE","data");



    QString employeepath="/SQLite/AACILaborTracking.db";
    QString projectpath="/SQLite/AACIProjectList.db";
    QString datapath = "/SQLite/AACIData.sqlite";
    QString path = QDir::currentPath();
    QString serverpath = path.split("/")[0]+"/"+path.split("/")[1]+"/"+path.split("/")[2];
    qDebug()<<serverpath<<datapath;
    QString x = "//SERVER-JOSH/AACI Labor Tracking/Data/AACILaborTracking.db";
    QString y = "//SERVER-JOSH/AACI Labor Tracking/Data/AACIProjectList.db";
    QString z = "//SERVER-JOSH/AACI Labor Tracking/Data/AACIData.sqlite";

    QString database = ":/database/data.sqlite";
    if(fileExists(x)&&fileExists(y))
    {
        employeeDataBase.setDatabaseName(x);
        projectDataBase.setDatabaseName(y);
        data.setDatabaseName(z);
        qDebug()<<"Connected to network database...";
    }
    else if(fileExists("../SQLite/data.sqlite")){
        employeeDataBase.setDatabaseName(serverpath+employeepath);
        projectDataBase.setDatabaseName(serverpath+projectpath);
        data.setDatabaseName("../SQLite/data.sqlite");
        qDebug()<<"Connected to local database";
    }

    employeeDataBase.open();
    projectDataBase.open();
    data.open();

}
void MainForm::Disconnect(){
    employeeDataBase.close();
    employeeDataBase.removeDatabase("employeeDataBase");
    projectDataBase.close();
    projectDataBase.removeDatabase("projectDataBase");
}
void MainForm::establishConnections(){
    QObject::connect(loginForm,SIGNAL(logged()),this,SLOT(enter()));
    QObject::connect(clockoutForm,SIGNAL(finished()),this,SLOT(reenter()));
    QObject::connect(shifteditform,SIGNAL(finished()),this,SLOT(refreshShiftTab()));

}
bool MainForm::fileExists(QString path) {
    QFileInfo check_file(path);

    return check_file.exists() && check_file.isFile();
}
void MainForm::enter(){
    showtheThings();
    mainInitialize();
}
void MainForm::reenter(){
    qDebug()<<"herer";
    showtheThings();
    basicInitialize();
}
void MainForm::hidetheThings(){
    ui->basicPageAdvanced->hide();
    ui->basicPageClockIn->hide();
    ui->basicPageClockOut->hide();

}
void MainForm::showtheThings(){
    ui->basicPageAdvanced->show();
    ui->basicPageClockIn->show();
    ui->basicPageClockOut->show();

}
void MainForm::on_HeaderTabs_currentChanged(int index)
{
    if(index ==1){
        refreshProjectItemCombo();
    }
}

void MainForm::loginInitialize(){
    basicInitialize();
    hidetheThings();

    loginForm->reset();
    loginForm->showNormal();

}
void MainForm::mainInitialize(){
    id=loginForm->id;
    admin=loginForm->admin;

    basicInitialize();
}
void MainForm::basicInitialize()
{
    ui->mainStack->setCurrentIndex(0);
    if(admin==true)
        ui->basicPageAdvanced->show();
    else
        ui->basicPageAdvanced->hide();

    QSqlQuery qry(data);
    QString active;

    qry.prepare("SELECT active FROM employeelist WHERE id = '"+id+"'");
    if(qry.exec())
    {
        while(qry.next())
        {
            active = qry.value(0).toString();
        }
    }
    qDebug()<<active;
    if(active == "1")
    {
       ui->basicPageClockIn->hide();
       ui->basicPageClockOut->show();
    }
    else if(active== "0")
    {
        ui->basicPageClockIn->show();
        ui->basicPageClockOut->hide();
    }
}
void MainForm::advInitialize(){
    ui->mainStack->setCurrentIndex(1);

}
QDateTime MainForm::format_datetimes(QDateTime z)
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
void MainForm::on_basicPageClockIn_clicked()
{
    QSqlQuery qry1(data),qry2(data),qry3(data),qry4(data);
    QString employeename, employeeid, timein,datein;
    QDateTime x = QDateTime::currentDateTime();
    QDateTime z = format_datetimes(x);

    employeeid = id;
    timein = z.toString("HH:mm:ss");
    datein = z.toString("yyyy-MM-dd");
    qry1.prepare("SELECT shiftcount,name FROM employeelist WHERE id = '"+id+"'");


    if(qry1.exec())
    {

        while(qry1.next())
        {

            employeename = qry1.value(1).toString();
        }
    }




    // Inserting clockin time and shiftnumber into pin.
    qry4.prepare("insert into shiftlist (employeeid,employeename,timein,datein) values('"+employeeid+"','"+employeename+"','"+timein+"','"+datein+"')");
    if (qry4.exec())
    {
        // Setting active.
        qry2.prepare("update employeelist set active=1 where id = '"+id+"'");
        qry2.exec();
        // Setting employeelist shiftcount.
        QString shiftcount;
        qry1.clear();
        qry1.prepare("select id from shiftlist where employeename ='"+employeename+"' and timein='"+timein+"'");
        if(qry1.exec())
        {
            while(qry1.next())
            {
                shiftcount = qry1.value(0).toString();
            }
        }

        qry3.prepare("update employeelist set shiftcount = '"+shiftcount+"' where id = '"+id+"'");
        qry3.exec();
    }

    ui->basicPageClockIn->hide();
    ui->basicPageClockOut->show();


}
void MainForm::on_basicPageClockOut_clicked()
{

    clockoutForm = new ClockoutForm(this);
    establishConnections();
    clockoutForm->ClockoutInitialize(id);
}
void MainForm::on_basicPageAdvanced_clicked()
{
    advInitialize();
    EmployeeTab();
    ShiftTab();
    ProjectTab();
    ItemTab();
    ui->MainTabs->setCurrentIndex(0);
    ui->HeaderTabs->setCurrentIndex(0);
}
void MainForm::on_mainFinish_clicked()
{

    loginInitialize();
}





//Employee Stuff
void MainForm::EmployeeTab()
{
    ui->MainTabs->setCurrentIndex(0);

    QSqlQueryModel * x=EmployeeModel();
    ui->EmployeeView->setModel(x);
    ui->EmployeeView->resizeColumnsToContents();
    ui->EmployeeView->hideRow(0);
    ui->EmployeeName->setChecked(true);
    ui->EmployeeView->showColumn(0);
    ui->EmployeeId->setChecked(false);
    ui->EmployeeView->hideColumn(1);
    ui->EmployeePin->setChecked(true);
    ui->EmployeeView->showColumn(2);
    ui->EmployeeAdminStatus->setChecked(true);
    ui->EmployeeView->showColumn(3);
    ui->EmployeeShiftCount->setChecked(false);
    ui->EmployeeView->hideColumn(4);
    ui->EmployeeActive->setChecked(false);
    ui->EmployeeView->hideColumn(5);
    ui->EmployeeCurrent->setChecked(false);
    ui->EmployeeView->hideColumn(6);


    ui->AllRadio->setChecked(true);


}
void MainForm::refreshEmployeeTab(){
    ui->MainTabs->setCurrentIndex(0);

    QSqlQueryModel * x=EmployeeModel();
    ui->EmployeeView->setModel(x);
    

    ui->EmployeeView->resizeColumnsToContents();

    if(ui->EmployeeName->isChecked())
        ui->EmployeeView->showColumn(0);
    else
        ui->EmployeeView->hideColumn(0);

    if(ui->EmployeeId->isChecked())
        ui->EmployeeView->showColumn(1);
    else
        ui->EmployeeView->hideColumn(1);

    if(ui->EmployeePin->isChecked())
        ui->EmployeeView->showColumn(2);
    else
        ui->EmployeeView->hideColumn(2);

    if(ui->EmployeeAdminStatus->isChecked())
        ui->EmployeeView->showColumn(3);
    else
        ui->EmployeeView->hideColumn(3);

    if(ui->EmployeeShiftCount->isChecked())
        ui->EmployeeView->showColumn(4);
    else
        ui->EmployeeView->hideColumn(4);

    if(ui->EmployeeActive->isChecked())
        ui->EmployeeView->showColumn(5);
    else
        ui->EmployeeView->hideColumn(5);

    if(ui->EmployeeCurrent->isChecked())
        ui->EmployeeView->showColumn(6);
    else
        ui->EmployeeView->hideColumn(6);

    
}
QSqlQueryModel * MainForm::EmployeeModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("employeelist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Pin"));
    model->setHeaderData(3,Qt::Horizontal,tr("Adminstatus"));
    model->setHeaderData(4,Qt::Horizontal,tr("Shiftcount"));
    model->setHeaderData(5,Qt::Horizontal,tr("Active"));
    model->setHeaderData(6,Qt::Horizontal,tr("Current"));
    return model;

}
//Employee Menu 1
void MainForm::on_EmployeeAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QSqlQueryModel * x = EmployeeModel();
    qry->prepare("insert into employeelist(name,pin,adminstatus,shiftcount,active,current)  values('~','~','~','1','0','1')");
    qry->exec();
    refreshEmployeeTab();
    refreshShiftEmployee();
    ui->MainTabs->setCurrentIndex(0);
}
void MainForm::on_EmployeeArchive_clicked()
{

    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->EmployeeView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = EmployeeModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);

        qry->clear();
        if(x->record(index.row()).value(6).toInt()==1)
        {
            qry->prepare("update employeelist set current=0 where id = '"+id+"'");
        }
        else if (x->record(index.row()).value(6).toInt()==0)
        {
            qry->prepare("update employeelist set current=1 where id = '"+id+"'");
        }
        qry->exec();
    }
    refreshEmployeeTab();
}
void MainForm::on_EmployeeDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->EmployeeView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = EmployeeModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);

        qry->clear();
        qry->prepare("DELETE from employeelist where id='"+id+"'");
        qry->exec();
    }
    refreshEmployeeTab();
    refreshShiftEmployee();
    ui->MainTabs->setCurrentIndex(0);

}
//Employee Menu 2
void MainForm::on_EmployeeName_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeePin_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeAdminStatus_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeShiftCount_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeActive_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeId_clicked()
{
    refreshEmployeeTab();
}
void MainForm::on_EmployeeCurrent_clicked()
{
    refreshEmployeeTab();
}
//Employee Menu 3
void MainForm::on_AllRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            ui->EmployeeView->showRow(i);
        }
    }

}
void MainForm::on_CurrentRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(6).toInt();
            if(current == 1)
               ui->EmployeeView->showRow(i);
            else
                ui->EmployeeView->hideRow(i);
        }
    }
}
void MainForm::on_PastRadio_toggled(bool checked)
{
    if(checked)
    {
        QSqlQueryModel * x = EmployeeModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(6).toInt();
            if(current == 1)
               ui->EmployeeView->hideRow(i);
            else
                ui->EmployeeView->showRow(i);
        }
    }
}


void MainForm::ProjectTab(){
    QSqlQueryModel * x=ProjectModel();
    ui->ProjectView->setModel(x);
    ui->ProjectView->resizeColumnsToContents();
    ui->ProjectView->hideRow(0);
    ui->ProjectView->hideColumn(1);
    ui->ProjectView->hideColumn(2);
    ui->ProjectName->setChecked(true);
    ui->ProjectAllRadio->setChecked(true);


    ui->ProjectItemName->setChecked(true);
    
    refreshProjectItemCombo();


}
void MainForm::refreshProjectItemCombo(){
    QSqlQueryModel * a = new QSqlQueryModel();
    QSqlQuery * A = new QSqlQuery(data);
    A->prepare("Select name from itemlist where id>0");
    A->exec();
    a->setQuery(*A);
    ui->ProjectItemCombo->setModel(a);
}

QSqlQueryModel * MainForm::ProjectModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("projectlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();

    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Current"));


    return model;

}
QSqlQueryModel * MainForm::ProjectItemModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);

    QModelIndexList list = ui->ProjectView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ProjectModel();
    QModelIndex index = list.at(0);
    int idInt = x->record(index.row()).value(1).toInt();
    QString id = QString::number(idInt);

    model->setTable("Project"+id);

    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    qDebug()<< model->lastError();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    
    return model;
}

void MainForm::on_ProjectView_clicked(const QModelIndex &index)
{

    QSqlQueryModel * x = ProjectItemModel();
    ui->ProjectItemView->setModel(x);
    ui->ProjectView->resizeColumnsToContents();
    refreshProjectItemTab();
}
void MainForm::refreshProjectTab(){
    ui->MainTabs->setCurrentIndex(1);

    QSqlQueryModel * x=ProjectModel();
    ui->ProjectView->setModel(x);

    ui->ProjectView->resizeColumnsToContents();


    if(ui->ProjectName->isChecked())
        ui->ProjectView->showColumn(0);
    else
        ui->ProjectView->hideColumn(0);

    if(ui->ProjectId->isChecked())
        ui->ProjectView->showColumn(1);
    else
        ui->ProjectView->hideColumn(1);

    if(ui->ProjectCurrent->isChecked())
        ui->ProjectView->showColumn(2);
    else
        ui->ProjectView->hideColumn(2);



}
void MainForm::refreshProjectItemTab(){
    ui->MainTabs->setCurrentIndex(1);

    QSqlQueryModel * x = ProjectItemModel();
    ui->ProjectItemView->setModel(x);



    if(ui->ProjectItemName->isChecked())
        ui->ProjectItemView->showColumn(0);
    else
        ui->ProjectItemView->hideColumn(0);

    if(ui->ProjectItemId->isChecked())
        ui->ProjectItemView->showColumn(1);
    else
        ui->ProjectItemView->hideColumn(1);
    ui->ProjectItemView->resizeColumnsToContents();
}

void MainForm::on_ProjectAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);

    QSqlQueryModel * x = ProjectModel();


    qry->prepare("insert into projectlist(name,current)  values('~','1')");
    qry->exec();
    qry->clear();

    int idInt = x->record(x->rowCount()-1).value(1).toInt();
    idInt++;
    QString id = "Project"+QString::number(idInt);
    qry->prepare("CREATE TABLE '"+id+"'"
               "(name VARCHAR,id integer)");
    qry->exec();
    refreshProjectTab();
    refreshShiftProject();
    ui->MainTabs->setCurrentIndex(1);

}
void MainForm::on_ProjectDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ProjectView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ProjectModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = "Project"+QString::number(idInt);

        qry->clear();
        qry->prepare("DROP TABLE '"+id+"'");
        qry->exec();
        qry->clear();
        qry->prepare("DELETE from projectlist where id='"+id+"'");
        qry->exec();
    }
    refreshProjectTab();
    refreshShiftProject();
    ui->MainTabs->setCurrentIndex(1);
}
void MainForm::on_ProjectArchive_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ProjectView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ProjectModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);
        qDebug()<<id;
        qry->clear();
        if(x->record(index.row()).value(2).toInt()==1)
        {
            qry->prepare("update projectlist set current=0 where id = '"+id+"'");
        }
        else if (x->record(index.row()).value(2).toInt()==0)
        {
            qry->prepare("update projectlist set current=1 where id = '"+id+"'");
        }
        qry->exec();
    }
    refreshProjectTab();
}

void MainForm::on_ProjectName_clicked()
{
    refreshProjectTab();
}
void MainForm::on_ProjectId_clicked()
{
    refreshProjectTab();
}
void MainForm::on_ProjectCurrent_clicked()
{
    refreshProjectTab();
}

void MainForm::on_ProjectAllRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            ui->ProjectView->showRow(i);
        }
    }
}
void MainForm::on_ProjectCurrentRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(2).toInt();
            if(current == 1)
               ui->ProjectView->showRow(i);
            else
                ui->ProjectView->hideRow(i);
        }
    }
}
void MainForm::on_ProjectPastRadio_toggled(bool checked)
{
    if(checked){
        QSqlQueryModel * x = ProjectModel();
        for(int i=1; i< x->rowCount(); i++)
        {
            int current = x->record(i).value(2).toInt();
            if(current == 1)
               ui->ProjectView->hideRow(i);
            else
                ui->ProjectView->showRow(i);
        }
    }
}

void MainForm::on_ProjectItemName_clicked()
{
    refreshProjectItemTab();
}
void MainForm::on_ProjectItemId_clicked()
{
    refreshProjectItemTab();
}


void MainForm::on_ProjectItemAdd_clicked()
{
    QString itemName = ui->ProjectItemCombo->currentText();
    QSqlQuery * qry = new QSqlQuery(data);
    qry->prepare("select id from itemlist where name='"+itemName+"'");
    QString itemId;
    if(qry->exec()){
        while(qry->next())
            itemId = qry->value(0).toString();
    }



    qry->clear();
    
    QSqlTableModel * model = (QSqlTableModel*)ui->ProjectItemView->model();
    QString table = model->tableName();
    qry->prepare("insert into'"+table+"'(name,id) values('"+itemName+"','"+itemId+"')");
    qry->exec();
    refreshProjectItemTab();
            
}
void MainForm::on_ProjectItemRemove_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ProjectItemView->selectionModel()->selection().indexes();
    QSqlQueryModel * model = ProjectItemModel();
    QSqlTableModel * tablemodel = (QSqlTableModel*)ui->ProjectItemView->model();
    QString table = tablemodel->tableName();
    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        QString id = model->record(index.row()).value(1).toString();

        qry->clear();
        qry->prepare("DELETE from '"+table+"' where id='"+id+"'");
        qry->exec();
    }
    refreshProjectItemTab();
}

void MainForm::ItemTab(){
    QSqlQueryModel * x=ItemModel();
    ui->ItemView->setModel(x);
    ui->ItemView->hideRow(0);
    ui->ItemView->resizeColumnsToContents();
    ui->ItemName->setChecked(true);
    ui->ItemId->setChecked(true);
    ui->ItemCategory->setChecked(true);
    ui->ItemSub->setChecked(true);
    ui->ItemDimension->setChecked(true);
}
QSqlQueryModel * MainForm::ItemModel(){
    QSqlTableModel * model = new QSqlTableModel(0,data);
    model->setTable("itemlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Name"));
    model->setHeaderData(1,Qt::Horizontal,tr("Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Category"));
    model->setHeaderData(3,Qt::Horizontal,tr("Sub-Catergory"));
    model->setHeaderData(4,Qt::Horizontal,tr("Dimension"));

    return model;

}
void MainForm::refreshItemTab(){
    ui->MainTabs->setCurrentIndex(2);

    QSqlQueryModel * x=ItemModel();
    ui->ItemView->setModel(x);

    ui->ItemView->resizeColumnsToContents();

    if(ui->ItemCategory->isChecked())
        ui->ItemView->showColumn(2);
    else
        ui->ItemView->hideColumn(2);

    if(ui->ItemSub->isChecked())
        ui->ItemView->showColumn(3);
    else
        ui->ItemView->hideColumn(3);

    if(ui->ItemDimension->isChecked())
        ui->ItemView->showColumn(4);
    else
        ui->ItemView->hideColumn(4);

    if(ui->ItemId->isChecked())
        ui->ItemView->showColumn(1);
    else
        ui->ItemView->hideColumn(1);

    if(ui->ItemName->isChecked())
        ui->ItemView->showColumn(0);
    else
        ui->ItemView->hideColumn(0);


}

void MainForm::on_ItemAdd_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QSqlQueryModel * x = ItemModel();
    qry->prepare("insert into itemlist(name,category,subcategory,dimension)  values('~','~','~','~')");
    qry->exec();
    refreshItemTab();
    refreshProjectItemCombo();
    refreshShiftItem();
    ui->MainTabs->setCurrentIndex(2);
}
void MainForm::on_ItemDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ItemView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ItemModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(1).toInt();
        QString id = QString::number(idInt);


        qry->clear();
        qry->prepare("DELETE from itemlist where id='"+id+"'");
        qry->exec();
    }
    refreshItemTab();
    refreshProjectItemCombo();
    refreshShiftItem();
    ui->MainTabs->setCurrentIndex(2);
}

void MainForm::on_ItemName_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemId_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemCategory_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemSub_clicked()
{
    refreshItemTab();
}
void MainForm::on_ItemDimension_clicked()
{
    refreshItemTab();
}



void MainForm::ShiftTab(){

    refreshShiftEmployee();
    refreshShiftProject();
    refreshShiftItem();
    QSqlQueryModel * x=ShiftModel();

    ui->ShiftView->setModel(x);
    ui->ShiftView->setSortingEnabled(true);
    ui->ShiftDate1->setDate(QDate(2000,1,1));
    ui->ShiftDate2->setDate(QDate::currentDate());
    ui->ShiftView->hideColumn(0);
    ui->ShiftView->hideColumn(1);
    ui->ShiftView->hideColumn(2);
    ui->ShiftView->hideColumn(3);
    ui->ShiftView->hideColumn(13);

    refreshShiftTab();
}
void MainForm::refreshShiftEmployee(){
    QSqlQueryModel * a = new QSqlQueryModel();
    QSqlQuery * A = new QSqlQuery(data);
    A->prepare("Select name from employeelist");
    A->exec();
    a->setQuery(*A);
    ui->ShiftEmployeeCombo->setModel(a);

}
void MainForm::refreshShiftProject(){
    QSqlQueryModel * b = new QSqlQueryModel();
    QSqlQuery * B = new QSqlQuery(data);
    B->prepare("Select name from projectlist");
    B->exec();
    b->setQuery(*B);
    ui->ShiftProjectCombo->setModel(b);
}
void MainForm::refreshShiftItem(){
    QSqlQueryModel * c = new QSqlQueryModel();
    QSqlQuery * C = new QSqlQuery(data);
    C->prepare("Select name from itemlist");
    C->exec();
    c->setQuery(*C);
    ui->ShiftItemCombo->setModel(c);
}

QSqlQueryModel * MainForm::ShiftModel(){

    QSqlTableModel * model = new QSqlTableModel(0,data);

    model->setTable("shiftlist");
    model->setEditStrategy(QSqlTableModel::OnFieldChange);
    model->select();
    model->setHeaderData(0,Qt::Horizontal,tr("Id"));
    model->setHeaderData(1,Qt::Horizontal,tr("Employee Id"));
    model->setHeaderData(2,Qt::Horizontal,tr("Project Id"));
    model->setHeaderData(3,Qt::Horizontal,tr("Item Id"));
    model->setHeaderData(4,Qt::Horizontal,tr("Employee Name"));
    model->setHeaderData(5,Qt::Horizontal,tr("Project Name"));
    model->setHeaderData(6,Qt::Horizontal,tr("Item Name"));
    model->setHeaderData(7,Qt::Horizontal,tr("Time In"));
    model->setHeaderData(8,Qt::Horizontal,tr("Date In"));
    model->setHeaderData(9,Qt::Horizontal,tr("Time Out"));
    model->setHeaderData(10,Qt::Horizontal,tr("Date out"));
    model->setHeaderData(11,Qt::Horizontal,tr("Lunch Time"));
    model->setHeaderData(12,Qt::Horizontal,tr("Time"));


    return model;

}
void MainForm::refreshShiftTab(){
    ui->MainTabs->setCurrentIndex(3);
    QSqlQueryModel * x = ShiftModel();

    for(int i=0; i< x->rowCount(); i++)
    {

        ui->ShiftView->showRow(i);
//        if(x->record(i).value(3).toString()==""){
//            qDebug()<<x->record(i).value(3).toString();
//            ui->ShiftView->hideRow(i);
//        }
    }

    if(ui->ShiftEmployeeCombo->currentText()!="All Employees")
    {
        for(int i=0; i< x->rowCount(); i++)
        {
            QString data = x->record(i).value(4).toString();
            if(data != ui->ShiftEmployeeCombo->currentText())
               ui->ShiftView->hideRow(i);
        }
    }
    if(ui->ShiftProjectCombo->currentText()!="All Projects")
    {
        for(int i=0; i< x->rowCount(); i++)
        {
            QString data = x->record(i).value(5).toString();
            if(data != ui->ShiftProjectCombo->currentText())
               ui->ShiftView->hideRow(i);
        }
    }
    if(ui->ShiftItemCombo->currentText()!="All Items")
    {
        for(int i=0; i< x->rowCount(); i++)
        {
            QString data = x->record(i).value(6).toString();
            if(data != ui->ShiftItemCombo->currentText())
               ui->ShiftView->hideRow(i);
        }
    }
    for(int i=0; i< x->rowCount(); i++)
    {
        QString a = x->record(i).value(9).toString();
        QDate in= QDate(a.split("-")[0].toInt(),a.split("-")[1].toInt(),a.split("-")[2].toInt());
        if(in<ui->ShiftDate1->date())
            ui->ShiftView->hideRow(i);
        else if(in>ui->ShiftDate2->date())
            ui->ShiftView->hideRow(i);
    }





    ui->ShiftView->setModel(x);

}

void MainForm::on_ShiftDate1_dateChanged(const QDate &date)
{
    refreshShiftTab();
}
void MainForm::on_ShiftDate2_dateChanged(const QDate &date)
{
    refreshShiftTab();
}

void MainForm::on_ShiftEmployeeCombo_currentTextChanged(const QString &arg1)
{
    refreshShiftTab();
}
void MainForm::on_ShiftProjectCombo_currentTextChanged(const QString &arg1)
{
    refreshShiftTab();
}
void MainForm::on_ShiftItemCombo_currentTextChanged(const QString &arg1)
{
    refreshShiftTab();
}


void MainForm::on_ShiftAdd_clicked()
{
    shifteditform = new ShiftEditForm(this);
    establishConnections();
    shifteditform->ShiftEditInitialize();
    refreshShiftTab();
}
void MainForm::on_ShiftEdit_clicked()
{
    shifteditform = new ShiftEditForm(this);
    establishConnections();
    QModelIndexList list = ui->ShiftView->selectionModel()->selection().indexes();

    if(list!= *(new QModelIndexList()))
    {
        QModelIndex index =list.at(0);
        QSqlQueryModel * x = ShiftModel();
        int idInt = x->record(index.row()).value(13).toInt();
        QString id = QString::number(idInt);

        shifteditform->ShiftEditInitialize(id);
        refreshShiftTab();
    }
}
void MainForm::on_ShiftDelete_clicked()
{
    QSqlQuery * qry = new QSqlQuery(data);
    QModelIndexList list = ui->ShiftView->selectionModel()->selection().indexes();
    QSqlQueryModel * x = ShiftModel();

    for(int i=0; i< list.count(); i++)
    {
        QModelIndex index =list.at(i);
        int idInt = x->record(index.row()).value(13).toInt();
        QString id = QString::number(idInt);


        qry->clear();
        qry->prepare("DELETE from shiftlist where shiftid='"+id+"'");
        qry->exec();
    }
    refreshShiftTab();
}



QSqlDatabase MainForm::getProjectDataBase() const
{
    return projectDataBase;
}
QSqlDatabase MainForm::getEmployeeDataBase() const
{
    return employeeDataBase;
}
QSqlDatabase MainForm::getData() const
{
    return data;
}

