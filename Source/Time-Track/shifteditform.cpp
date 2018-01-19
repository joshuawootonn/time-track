#include "shifteditform.h"
#include "ui_shifteditform.h"
#include "mainform.h"

ShiftEditForm::ShiftEditForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ShiftEditForm)
{
    ui->setupUi(this);

    data = ((MainForm*)parentWidget())->getData();

    clicked = false;
    ui->RefreshButton->hide();
    ui->Add->setDefault(false);
    ui->Delete->setDefault(false);
    ui->FinishedButton->setDefault(false);
    ui->RefreshButton->setDefault(false);
    ui->CancelButton->setDefault(false);
    ui->Description->setVisible(false);
    ui->Description_label->setVisible(false);
    ui->tabWidget->setCurrentIndex(0);










    ui->DateTime1->installEventFilter(this);
    ui->DateTime2->installEventFilter(this);
    ui->Name->installEventFilter(this);
    ui->Projects->installEventFilter(this);
    ui->Items->installEventFilter(this);
    ui->Description->installEventFilter(this);
    ui->Times->installEventFilter(this);
    ui->Lunch->installEventFilter(this);

}

ShiftEditForm::~ShiftEditForm()
{
    delete ui;
}
bool ShiftEditForm::eventFilter(QObject* object,QEvent* event)
{
    if(object == ui->Name && event->type() == QEvent::MouseButtonPress) {

        ui->Name->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    else if(object == ui->Projects && event->type() == QEvent::MouseButtonPress) {

        ui->Projects->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    else if(object == ui->Items && event->type() == QEvent::MouseButtonPress) {

        ui->Items->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }else if(object == ui->Description && event->type() == QEvent::MouseButtonPress) {

        ui->Description->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    else if(object == ui->Times && event->type() == QEvent::MouseButtonPress) {

        ui->Times->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    else if(object == ui->Lunch && event->type() == QEvent::MouseButtonPress) {

        ui->Lunch->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    else if(object == ui->DateTime1 && event->type() == QEvent::MouseButtonPress) {

        ui->DateTime1->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    else if(object == ui->DateTime2 && event->type() == QEvent::MouseButtonPress) {

        ui->DateTime2->setFocus();
        QRect rec = QApplication::desktop()->screenGeometry();
        if(rec.width() < 1400)
            QDesktopServices::openUrl(QUrl("file:///C:/Program Files/Common Files/Microsoft Shared/Ink/TabTip.exe"));
        return false;
    }
    return false;
}
QDateTime ShiftEditForm::format_datetimes(QDateTime z)
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
int ShiftEditForm::format_time_length(QDateTime a, QDateTime b){
    int secs = a.secsTo(b);
    int minutes = secs/60;
    int hours = minutes/60;
    minutes = minutes%60;

    if(minutes<7&&minutes>=0)
    {
        minutes = 0;
    }
    else if(minutes>=7&&minutes<23)
    {
        minutes = 15;
    }
    else if(minutes>=23&&minutes<37)
    {
        minutes = 30;
    }
    else if(minutes>=37&&minutes<53)
    {
        minutes = 45;
    }
    else{
        minutes = 60;
    }
    return minutes+hours*60;
}
void ShiftEditForm::on_tabWidget_currentChanged(int index)
{
    if(index == 0){
        ui->timeAllocated->show();
        ui->timeTotal->show();
        ui->label->show();
    }else{
        ui->label->hide();
        ui->timeAllocated->hide();
        ui->timeTotal->hide();
    }
}

/* These next three functions are for ininializing this
 * dialog according to its purpose. The first for adding
 * a new shift the second for editing a existing shift.
 * The third for editing a working shift. */

void ShiftEditForm::AddShift(){
    this->showNormal();
    deactivate = false;
    activate = true;


    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
    //LunchInitialize();
    TimeLeft();
    //TimesInitialize();










    ui->ClockinDateTime->setDateTime(QDateTime::currentDateTime());


    ui->DateTime1->setDateTime(QDateTime(QDate::currentDate(),QTime(6,30,0)));
    ui->DateTime2->setDateTime(QDateTime(QDate::currentDate(),QTime(18,30,0)));

    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(4);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    ui->Sections->setHorizontalHeaderItem(3,new QTableWidgetItem("Note"));
    ui->Sections->clearContents();

}
void ShiftEditForm::EditFinishedShift(QString shiftid){
    deactivate = false;
    activate = true;
    this->showNormal();
    shiftId = shiftid;
    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
    //LunchInitialize();
    TimeLeft();
    //TimesInitialize();

    ui->DateTime1->setDateTime(format_datetimes(QDateTime::currentDateTime()));
    ui->DateTime2->setDateTime(format_datetimes(QDateTime::currentDateTime()));

    QSqlQuery* qry=new QSqlQuery(data);
    QString employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,description;
    qry->prepare("select employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,description from shiftlist where shiftid='"+shiftid+"'");
    if(qry->exec())
    {
        while(qry->next())
        {
            employeename = qry->value(0).toString();
            projectname = qry->value(1).toString();
            itemname = qry->value(2).toString();
            timein = qry->value(3).toString();
            timeout = qry->value(4).toString();
            datein = qry->value(5).toString();
            dateout = qry->value(6).toString();
            timelunch = qry->value(7).toString();
            description = qry->value(8).toString();
        }
    }

    ui->Name->setCurrentIndex(ui->Name->findText(employeename));
    ui->Projects->setCurrentIndex(ui->Projects->findText(projectname));
    ui->Items->setCurrentIndex(ui->Items->findText(itemname));
    ui->DateTime1->setTime(QTime::fromString(timein,"HH:mm:ss"));
    ui->DateTime2->setTime(QTime::fromString(timeout,"HH:mm:ss"));
    ui->DateTime1->setDate(QDate::fromString(datein,"yyyy-MM-dd"));
    ui->DateTime2->setDate(QDate::fromString(dateout,"yyyy-MM-dd"));
    //ui->Lunch->setCurrentIndex(ui->Lunch->findText(timelunch));
    ui->Lunch->setTime(QTime(timelunch.split(":")[0].toInt(),timelunch.split(":")[1].toInt()));
    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(4);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    ui->Sections->setHorizontalHeaderItem(3,new QTableWidgetItem("Note"));
    ui->tabWidget->tabBar()->hide();

    qry->clear();
    qry->prepare("select time,projectname,itemname,description from shiftlist where shiftid='"+shiftid+"'");
    if(qry->exec())
    {
        while(qry->next())
        {
            ui->Sections->setRowCount(ui->Sections->rowCount()+1);
            if(qry->value(0).toString() != "")
                ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(qry->value(0).toString()));
            else
                ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem("0:00"));
            ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(qry->value(1).toString()));
            ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(qry->value(2).toString()));
            ui->Sections->setItem(ui->Sections->rowCount()-1,3,new QTableWidgetItem(qry->value(3).toString()));

        }
    }
    ui->Sections->resizeRowsToContents();






}
void ShiftEditForm::EditWorkingShift(QString shiftid,QString id){
    this->showNormal();
    deactivate = true;
    activate = false;
    shiftId= shiftid;
    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
    //LunchInitialize();
    TimeLeft();
    // TimesInitialize();
    ui->DateTime1->setDateTime(QDateTime::currentDateTime());
    ui->DateTime2->setDateTime(QDateTime::currentDateTime());

    QSqlQuery* qry=new QSqlQuery(data);
    QString employeename,timein,datein;
    qry->prepare("select employeename,timein,datein from shiftlist where id='"+id+"'");
    if(qry->exec())
    {
        while(qry->next())
        {
            employeename = qry->value(0).toString();
            timein = qry->value(1).toString();
            datein = qry->value(2).toString();
        }
    }



    ui->Name->setCurrentIndex(ui->Name->findText(employeename));
    ui->ClockinName->setCurrentIndex(ui->ClockinName->findText(employeename));

    ui->DateTime1->setTime(QTime::fromString(timein,"HH:mm:ss"));
    ui->ClockinDateTime->setTime(QTime::fromString(timein,"HH:mm:ss"));
    ui->DateTime1->setDate(QDate::fromString(datein,"yyyy-MM-dd"));
    ui->ClockinDateTime->setDate(QDate::fromString(datein,"yyyy-MM-dd"));

    ui->Sections->setRowCount(0);
    ui->Sections->setColumnCount(4);
    ui->Sections->setHorizontalHeaderItem(0,new QTableWidgetItem("Project"));
    ui->Sections->setHorizontalHeaderItem(1,new QTableWidgetItem("Items"));
    ui->Sections->setHorizontalHeaderItem(2,new QTableWidgetItem("Time"));
    ui->Sections->setHorizontalHeaderItem(3,new QTableWidgetItem("Note"));






}
void ShiftEditForm::updateShiftEdit(){
    EmployeeInitialize();
    ProjectInitialize();
    ItemInitialize();
}

/* These next six functions are used to initialize the
 * comboboxes with there appropriate model's. */
void ShiftEditForm::EmployeeInitialize(bool in){
    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    if(in){
        qry->prepare("select DISTINCT name from employeelist where current='1' AND active='1' ORDER BY name ASC");
    }else{
        qry->prepare("select DISTINCT name from employeelist where current='1' AND active='0' ORDER BY name ASC");
    }
    qry->exec();
    modal->setQuery(*qry);
    ui->ClockinName->setModel(modal);
    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Name);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Name->setCurrentText("");
}

void ShiftEditForm::EmployeeInitialize(){

    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    QString x = "where current='1' ";
    qry->prepare("select DISTINCT name from employeelist ORDER BY name ASC");
    qry->exec();
    modal->setQuery(*qry);
    ui->Name->setModel(modal);    
    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Name);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Name->setCurrentText("");
    if(deactivate)
        EmployeeInitialize(true);
    else if(!deactivate)
        EmployeeInitialize(false);

}
void ShiftEditForm::ProjectInitialize(){

    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    qry->prepare("select DISTINCT name from projectlist where current = '1' ORDER BY name ASC");
    qry->exec();
    modal->setQuery(*qry);
    ui->Projects->setModel(modal);
//    QCompleter * comp = new QCompleter(this);
//    comp->setModel(modal);
//    comp->setCaseSensitivity(Qt::CaseInsensitive);
//    comp->setCompletionMode(QCompleter::PopupCompletion);
//    //comp->popup()->setCurrentIndex(comp->completionModel()->index(0,0));
//    ui->Projects->setCompleter(comp);

    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Projects);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Projects->setCurrentText("");


}
void ShiftEditForm::ItemInitialize(){

    QString id;
    QString x = ui->Projects->currentText();
    QSqlQueryModel * modal2=new QSqlQueryModel();
    QSqlQuery* qry = new QSqlQuery(data);
    qry->prepare("select id from projectlist where name='"+x+"'");
    if(qry->exec())
    {
           while(qry->next())
           {
               id = qry->value(0).toString();
           }
    }
    //qDebug()<<id;
    QSqlQuery* qry2=new QSqlQuery(data);
    id = "Project"+id;
    qry2->prepare("select DISTINCT name from "+id+" ORDER BY name ASC");
    qry2->exec();
    //qDebug()<<"qry2:"<<qry2->lastError();

    modal2->setQuery(*qry2);
    ui->Items->setModel(modal2);
//    QCompleter * comp = new QCompleter(this);
//    comp->setModel(modal2);
//    comp->setCaseSensitivity(Qt::CaseInsensitive);
//    comp->setCompletionMode(QCompleter::PopupCompletion);
//    ui->Items->setCompleter(comp);
    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->Items);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->Items->setCurrentText("");
}

void ShiftEditForm::TimeLeft(){
    QDateTime indt,outdt;
    QString timein,timeout,datein,dateout;
    timein = ui->DateTime1->time().toString("HH:mm:ss");
    datein = ui->DateTime1->date().toString("yyyy-MM-dd");
    timeout = ui->DateTime2->time().toString("HH:mm:ss");
    dateout = ui->DateTime2->date().toString("yyyy-MM-dd");

    indt = QDateTime(QDate::fromString(datein,"yyyy-MM-dd"),QTime::fromString(timein,"HH:mm:ss"));
    outdt = QDateTime(QDate::fromString(dateout,"yyyy-MM-dd"),QTime::fromString(timeout,"HH:mm:ss"));


    int minutes = format_time_length(indt,outdt);
    minutes-=ui->Lunch->time().hour()*60;
    minutes-=ui->Lunch->time().minute();


    ui->timeTotal->setText(minutesToTimeString(minutes));
    int minutesAllocated = 0;
    for(int i =0;i < ui->Sections->rowCount(); i++){
        QString item = ui->Sections->item(i,2)->text();
        minutesAllocated+=(item.split(":")[0].toInt()*60);
        minutesAllocated+=item.split(":")[1].toInt();
    }
    ui->timeAllocated->setText(minutesToTimeString(minutesAllocated));
    //for ease of calculating whether this form is completed
    if(minutes > minutesAllocated){
        timeStatus = -1;
    }else if(minutes < minutesAllocated){
        timeStatus = 1;
    }else{
        timeStatus = 0;
    }

}
QString ShiftEditForm::minutesToTimeString(int m){
    qDebug()<<m;
    QString time = "";
    time += QString::number(qAbs(m/60));
    qDebug()<<time << qAbs(m/60);
    time += ":";
    if(qAbs(m%60) < 10)
        time += QString::number(qAbs(m%60))+"0";
    else
        time += QString::number(qAbs(m%60));
    if(m < 0)
        return "-" + time;
    return time;
}


/*These classes are used to update the table and
 * comboboxs when triggers are hit*/

void ShiftEditForm::on_Projects_currentIndexChanged(const QString &arg1)
{
     ItemInitialize();
}
void ShiftEditForm::on_Projects_currentTextChanged(const QString &arg1)
{
    ItemInitialize();
}
void ShiftEditForm::on_Items_currentTextChanged(const QString &arg1)
{
    if(arg1 =="Other"){
        ui->Description->setVisible(true);
        ui->Description_label->setVisible(true);
        ui->Description->setText("");
    }else{
        ui->Description->setVisible(false);
        ui->Description_label->setVisible(false);
    }
}
void ShiftEditForm::on_Add_clicked()
{
    if(ui->Projects->currentText() == ""){
        ui->error->setText("Invalid: Select Project");
    }
    else if(ui->Items->currentText() == ""){
        ui->error->setText("Invalid: Select Item");
    }else if(ui->Items->currentText() == "Other" && ui->Description->text() == ""){
        ui->error->setText("Invalid: Add Note to the Task");
    }else
    {
        ui->error->setText("");
        ui->Sections->setRowCount(ui->Sections->rowCount()+1);
        if (QString::number(ui->Times->time().minute()) == "0")
            ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())+"0"));
        else
            ui->Sections->setItem(ui->Sections->rowCount()-1,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())));
        ui->Sections->setItem(ui->Sections->rowCount()-1,0,new QTableWidgetItem(ui->Projects->currentText()));
        ui->Sections->setItem(ui->Sections->rowCount()-1,1,new QTableWidgetItem(ui->Items->currentText()));
        if(ui->Items->currentText()!="Other"){
            ui->Sections->setItem(ui->Sections->rowCount()-1,3,new QTableWidgetItem(""));
        }else{
            ui->Sections->setItem(ui->Sections->rowCount()-1,3,new QTableWidgetItem(ui->Description->text()));
        }

        ui->Description->setText("");
        ui->Sections->resizeRowsToContents();
        TimeLeft();
        ui->Items->clearEditText();
        ui->Projects->clearEditText();
        if(ui->timeAllocated->text() == ui->timeTotal->text())
            ui->FinishedButton->setFocus();
        else
            ui->Projects->setFocus();
    }

}
void ShiftEditForm::on_Edit_clicked()
{
    if(ui->Projects->currentText() == ""){
        ui->error->setText("Invalid: Select Project");
    }else if(ui->Items->currentText() == ""){
        ui->error->setText("Invalid: Select Item");
    }else if(ui->Items->currentText() == "Other" && ui->Description->text() == ""){
        ui->error->setText("Invalid: Add Note to the Task");
    }else if(clicked)
    {
        ui->error->setText("");
        if (QString::number(ui->Times->time().minute()) == "0")
            ui->Sections->setItem(selectedRow,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())+"0"));
        else
            ui->Sections->setItem(selectedRow,2,new QTableWidgetItem(QString::number(ui->Times->time().hour())+":"+QString::number(ui->Times->time().minute())));
        ui->Sections->setItem(selectedRow,0,new QTableWidgetItem(ui->Projects->currentText()));
        ui->Sections->setItem(selectedRow,1,new QTableWidgetItem(ui->Items->currentText()));
        if(ui->Items->currentText()!="Other"){
            ui->Sections->setItem(selectedRow,3,new QTableWidgetItem(""));
        }else{
            ui->Sections->setItem(selectedRow,3,new QTableWidgetItem(ui->Description->text()));
        }

        ui->Description->setText("");
        ui->Sections->resizeRowsToContents();
        TimeLeft();
        ui->Items->clearEditText();
        ui->Projects->clearEditText();
        if(ui->timeAllocated->text() == ui->timeTotal->text())
            ui->FinishedButton->setFocus();
        else
            ui->Projects->setFocus();

        clicked = false;
    }else{
        ui->error->setText("Invalid: Select an Item");
    }
}
void ShiftEditForm::on_Delete_clicked()
{
    if (clicked)
    {
        ui->Sections->removeRow(selectedRow);
        TimeLeft();
        clicked = false;
    }
    else{
        ui->error->setText("Invalid: Select an Item");
    }


}
void ShiftEditForm::on_Sections_cellClicked(int row, int column)
{
    selectedRow=row;
    clicked = true;
    column++;
    QString project = ui->Sections->item(row,0)->text();
    QString item = ui->Sections->item(row,1)->text();
    QString time = ui->Sections->item(row,2)->text();
    QString note = ui->Sections->item(row,3)->text();

    int index = ui->Projects->findText(project);
    if ( index != -1 ) { // -1 for not found
       ui->Projects->setCurrentIndex(index);
    }

    index = ui->Items->findText(item);
    if ( index != -1 ) { // -1 for not found
       ui->Items->setCurrentIndex(index);
    }

    QTime t(time.split(":")[0].toInt(),time.split(":")[1].toInt());
    if ( time != "" ) { // -1 for not found
       ui->Times->setTime(t);

    }
    ui->Description->setText(note);



}
void ShiftEditForm::on_Sections_cellChanged()
{
    TimeLeft();
}

void ShiftEditForm::on_Lunch_timeChanged(const QTime &time)
{
    TimeLeft();

}
void ShiftEditForm::on_DateTime1_dateTimeChanged(const QDateTime &dateTime)
{
    TimeLeft();
}
void ShiftEditForm::on_DateTime2_dateTimeChanged(const QDateTime &dateTime)
{
    TimeLeft();
}
void ShiftEditForm::on_Description_textChanged()
{
    TimeLeft();
}


/*These two classes are used to finish or cancel the
 * changes that the user was trying to implement.*/

void ShiftEditForm::on_RefreshButton_clicked()
{
//    data = ((MainForm*)parentWidget())->getData();
//    EmployeeInitialize();
//    ProjectInitialize();
//    ItemInitialize();
}
bool ShiftEditForm::getSuccess() const
{
    return success;
}
void ShiftEditForm::on_FinishedButton_clicked()
{
    if(data.open()){
        if(ui->tabWidget->currentIndex()==0){            
            if(ui->Name->currentText()=="")
            {
                ui->error->setText("Invalid: Select Employee");
            }
            if(timeStatus == -1){
                ui->error->setText("Invalid: Too Little Time on Timesheet");
            }
            else if (timeStatus == 1){
                ui->error->setText("Invalid: Too Much Time on Timesheet");
            }
            else if(ui->Sections->rowCount()<1){
                ui->error->setText("Invalid: No Projects Added to Timesheet");
            }
            else{
                QSqlQuery* qry=new QSqlQuery(data);
                QString employeeid,employeename;


                qry->clear();
                qry->prepare("delete from shiftlist where shiftid='"+shiftId+"'");
                qry->exec();

                employeename = ui->Name->currentText();
                qry->prepare("select id from employeelist where name='"+employeename+"'");
                if(qry->exec()){
                    while(qry->next())
                        employeeid = qry->value(0).toString();
                }


                QDateTime clockin = ui->DateTime1->dateTime();
                QString timein = clockin.toString("HH:mm:ss");
                QString datein = clockin.toString("yyyy-MM-dd");


                QDateTime clockout = ui->DateTime2->dateTime();
                QString timeout = clockout.toString("HH:mm:ss");
                QString dateout = clockout.toString("yyyy-MM-dd");


                QString projectname,itemname, projectid,itemid,hours,lunch,shiftid,description;
                qry->clear();
                qry->prepare("select MAX(shiftid) As maxshiftid from shiftlist");
                if(qry->exec()){
                    while(qry->next()){
                        shiftid=qry->value(0).toString();}}
                int id = shiftid.toInt();
                id++;
                shiftid = QString::number(id);
                qry->clear();


                for(int i =0; i<ui->Sections->rowCount();i++){


                    projectname = ui->Sections->item(i,0)->text();
                    qry->prepare("select id from projectlist where name='"+projectname+"'");
                    if(qry->exec()){
                        while(qry->next()){
                            projectid=qry->value(0).toString();}}
                    qry->clear();
                    itemname=ui->Sections->item(i,1)->text();
                    qry->prepare("select id from itemlist where name='"+itemname+"'");
                    if(qry->exec()){
                        while(qry->next()){
                            itemid=qry->value(0).toString();
                        }
                    }



                    hours=ui->Sections->item(i,2)->text();
                    QTime x = QTime(hours.split(":")[0].toInt(),hours.split(":")[1].toInt(),0);
                    hours = x.toString("h:mm");
                    description = ui->Sections->item(i,3)->text();

                    if(ui->Lunch->time().minute() == 0)
                        lunch=QString::number(ui->Lunch->time().hour())+":"+QString::number(ui->Lunch->time().minute())+"0";
                    else
                        lunch=QString::number(ui->Lunch->time().hour())+":"+QString::number(ui->Lunch->time().minute());
                    qry->clear();
                    if(description!="")
                        qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid,description) values('"
                                 +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftid+"','"+description+"')");
                    else
                        qry->prepare("insert into shiftlist(employeeid,projectid,itemid,employeename,projectname,itemname,timein,timeout,datein,dateout,timelunch,time,shiftid) values('"
                                 +employeeid+"','"+projectid+"','"+itemid+"','"+employeename+"','"+projectname+"','"+itemname+"','"+timein+"','"+timeout+"','"+datein+"','"+dateout+"','"+lunch+"','"+hours+"','"+shiftid+"')");


                    if (qry->exec())
                        success = true;
                    else
                        success = false;
                }


                if(deactivate){
                    qry->clear();
                    qry->prepare("update employeelist set active='0' where id='"+employeeid+"'");
                    qry->exec();
                }
                this->hide();
                emit finished();

            }
        }else{
            QSqlQuery* qry=new QSqlQuery(data);

            QString shiftid;
            qry->prepare("select MAX(shiftid) As maxshiftid from shiftlist");
            if(qry->exec()){
                while(qry->next()){
                    shiftid=qry->value(0).toString();}}
            int id = shiftid.toInt();
            id++;
            shiftid = QString::number(id);

            QString employeename, employeeid;
            employeename = ui->ClockinName->currentText();
            qry->clear();
            qry->prepare("select id from employeelist where name='"+employeename+"'");
            if(qry->exec()){
                while(qry->next())
                    employeeid = qry->value(0).toString();
            }

            QDateTime clockin = ui->ClockinDateTime->dateTime();
            QString timein = clockin.toString("HH:mm:ss");
            QString datein = clockin.toString("yyyy-MM-dd");

            qry->clear();
            qry->prepare("delete from shiftlist where shiftid='"+shiftId+"'");
            qry->exec();

            qry->clear();
            qry->prepare("insert into shiftlist(employeeid,employeename,timein,datein,shiftid) values('"
                         +employeeid+"','"+employeename+"','"+timein+"','"+datein+"','"+shiftid+"')");


            if (qry->exec())
                success = true;
            else
                success = false;
            qDebug()<<qry->lastError();
            qDebug()<<qry->lastQuery();
            qry->clear();
            qry->prepare("update employeelist set shiftcount = '"+shiftid+"' where id = '"+employeeid+"'");
            qry->exec();
            if(activate){
                qry->clear();
                qry->prepare("update employeelist set active='1' where id='"+employeeid+"'");
                qry->exec();

            }

            this->hide();
            emit finished();
        }

    }
    else{
        ui->error->setText("Disconnected From Database. Verify Connection and Try Again");
    }

}
void ShiftEditForm::on_FinishButton2_clicked()
{
    on_FinishedButton_clicked();
}
void ShiftEditForm::on_CancelButton_clicked()
{
    success = true;
    this->hide();
    emit finished();
}
void ShiftEditForm::on_CancelButton2_clicked()
{
    on_CancelButton_clicked();
}











