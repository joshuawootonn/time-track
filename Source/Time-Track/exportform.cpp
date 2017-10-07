#include "exportform.h"
#include "ui_exportform.h"
#include <QFileDialog>
#include "xlsxdocument.h"
#include "mainform.h"
ExportForm::ExportForm(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ExportForm)
{
    ui->setupUi(this);
    ui->ExcelTableChange->addItem("Shift");
    ui->ExcelTableChange->addItem("All Shifts");
    data = ((MainForm*)parentWidget())->getData();

    int day = QDate::currentDate().dayOfWeek();
    ui->To->setDate(QDate::currentDate().addDays(-day-7));
    ui->From->setDate(QDate::currentDate().addDays(6-day-7));

    data = ((MainForm*)parentWidget())->getData();
    EmployeeInitialize();

}

ExportForm::~ExportForm()
{
    delete ui;
}

void ExportForm::on_ExcelLocationChange_clicked()
{
    QString filename = QFileDialog::getSaveFileName(this,"Export Location","/..","*.xlsx");
    ui->ExcelLocation->setText(filename);
}
void ExportForm::EmployeeInitialize(){

    QSqlQueryModel * modal=new QSqlQueryModel();
    QSqlQuery* qry=new QSqlQuery(data);
    QString x = "where current='1' ";
    qry->prepare("select DISTINCT name from employeelist ORDER BY name ASC");
    qry->exec();

    modal->setQuery(*qry);
    ui->ExcelTableName->setModel(modal);
    QCompleter * comp = new QCompleter(this);
    comp->setWidget(ui->ExcelTableName);
    comp->setCompletionMode(QCompleter::PopupCompletion);
    comp->setCaseSensitivity(Qt::CaseInsensitive);
    ui->ExcelTableName->setCurrentText("");


}
void ExportForm::on_buttonBox_accepted()
{
    Location = ui->ExcelLocation->text();
    Table = ui->ExcelTableChange->currentText();
    Name = ui->ExcelTableName->currentText();
    To = ui->To->date();
    From = ui->From->date();
    emit excel();

    this->hide();
}
void ExportForm::on_ExcelTableChange_currentTextChanged(const QString &arg1)
{
    if(arg1 == "Shift"){
        ui->ExcelTableName->show();
        ui->label_5->show();
    }else{
        ui->ExcelTableName->hide();
        ui->label_5->hide();
    }
}
