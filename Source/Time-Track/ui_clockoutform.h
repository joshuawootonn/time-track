/********************************************************************************
** Form generated from reading UI file 'clockoutform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CLOCKOUTFORM_H
#define UI_CLOCKOUTFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ClockoutForm
{
public:
    QGridLayout *gridLayout;
    QWidget *bigwidger;
    QGridLayout *gridLayout_2;
    QHBoxLayout *horizontalLayout_4;
    QVBoxLayout *verticalLayout_4;
    QHBoxLayout *horizontalLayout_9;
    QLabel *label_3;
    QComboBox *Projects;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_4;
    QComboBox *Items;
    QHBoxLayout *horizontalLayout_6;
    QLabel *DescriptionLabel;
    QLineEdit *Description;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_5;
    QComboBox *Hours;
    QLabel *label_8;
    QComboBox *Minutes;
    QSpacerItem *horizontalSpacer_2;
    QPushButton *Add;
    QPushButton *Edit;
    QPushButton *Delete;
    QHBoxLayout *horizontalLayout_7;
    QTableWidget *Sections;
    QHBoxLayout *horizontalLayout_2;
    QHBoxLayout *horizontalLayout_10;
    QLabel *label_2;
    QLabel *timeLeft;
    QSpacerItem *horizontalSpacer_4;
    QLabel *label_7;
    QLabel *timeWeek;
    QSpacerItem *horizontalSpacer_3;
    QLabel *error;
    QSpacerItem *horizontalSpacer;
    QLabel *label_6;
    QComboBox *Lunch;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;

    void setupUi(QWidget *ClockoutForm)
    {
        if (ClockoutForm->objectName().isEmpty())
            ClockoutForm->setObjectName(QStringLiteral("ClockoutForm"));
        ClockoutForm->resize(1280, 800);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        ClockoutForm->setFont(font);
        ClockoutForm->setStyleSheet(QLatin1String("QWidget#ClockoutForm{\n"
"\n"
"background-color:#E8E8E8;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 32px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E8E8E8;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QLineEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid 263544;	\n"
"}\n"
"QLineEdit:hover{ \n"
"background-color:#D1D1D1;\n"
"}\n"
"QLineEdit#Description{\n"
"margin:0;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#D1D1D1;\n"
"}\n"
"QDateEditTime::drop-down{\n"
""
                        "border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"padding-left:35px;\n"
" border: 0px solid 263544;	\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#D1D1D1;\n"
"\n"
"}\n"
"QComboBox#Items,QComboBox#Projects{\n"
"padding-left:2px;\n"
"}\n"
"\n"
"\n"
"QComboBox:drop-down{\n"
" border: none;\n"
"}\n"
"\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"QScrollBar:vertical {\n"
"border-radius: 10px;\n"
"background: black;\n"
"width: 100px;\n"
"/ margin sets up how far the handle can travel*/\n"
"margin: 0px 0px 0px 0px;\n"
"}"));
        gridLayout = new QGridLayout(ClockoutForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        bigwidger = new QWidget(ClockoutForm);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        gridLayout_2 = new QGridLayout(bigwidger);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));

        gridLayout_2->addLayout(horizontalLayout_4, 0, 0, 1, 1);

        verticalLayout_4 = new QVBoxLayout();
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setSpacing(10);
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        label_3 = new QLabel(bigwidger);
        label_3->setObjectName(QStringLiteral("label_3"));
        QSizePolicy sizePolicy(QSizePolicy::Fixed, QSizePolicy::Preferred);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(label_3->sizePolicy().hasHeightForWidth());
        label_3->setSizePolicy(sizePolicy);
        label_3->setMinimumSize(QSize(200, 0));
        label_3->setMaximumSize(QSize(200, 45));

        horizontalLayout_9->addWidget(label_3);

        Projects = new QComboBox(bigwidger);
        Projects->setObjectName(QStringLiteral("Projects"));
        QSizePolicy sizePolicy1(QSizePolicy::Preferred, QSizePolicy::Preferred);
        sizePolicy1.setHorizontalStretch(0);
        sizePolicy1.setVerticalStretch(0);
        sizePolicy1.setHeightForWidth(Projects->sizePolicy().hasHeightForWidth());
        Projects->setSizePolicy(sizePolicy1);
        Projects->setMinimumSize(QSize(0, 70));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        horizontalLayout_9->addWidget(Projects);


        verticalLayout_4->addLayout(horizontalLayout_9);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(10);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_4 = new QLabel(bigwidger);
        label_4->setObjectName(QStringLiteral("label_4"));
        sizePolicy.setHeightForWidth(label_4->sizePolicy().hasHeightForWidth());
        label_4->setSizePolicy(sizePolicy);
        label_4->setMinimumSize(QSize(200, 0));
        label_4->setMaximumSize(QSize(200, 45));

        horizontalLayout_5->addWidget(label_4);

        Items = new QComboBox(bigwidger);
        Items->setObjectName(QStringLiteral("Items"));
        sizePolicy1.setHeightForWidth(Items->sizePolicy().hasHeightForWidth());
        Items->setSizePolicy(sizePolicy1);
        Items->setMinimumSize(QSize(0, 70));

        horizontalLayout_5->addWidget(Items);


        verticalLayout_4->addLayout(horizontalLayout_5);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setSpacing(10);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        DescriptionLabel = new QLabel(bigwidger);
        DescriptionLabel->setObjectName(QStringLiteral("DescriptionLabel"));
        sizePolicy.setHeightForWidth(DescriptionLabel->sizePolicy().hasHeightForWidth());
        DescriptionLabel->setSizePolicy(sizePolicy);
        DescriptionLabel->setMaximumSize(QSize(200, 45));

        horizontalLayout_6->addWidget(DescriptionLabel);

        Description = new QLineEdit(bigwidger);
        Description->setObjectName(QStringLiteral("Description"));
        sizePolicy1.setHeightForWidth(Description->sizePolicy().hasHeightForWidth());
        Description->setSizePolicy(sizePolicy1);
        Description->setMinimumSize(QSize(0, 70));
        Description->setEchoMode(QLineEdit::Normal);

        horizontalLayout_6->addWidget(Description);


        verticalLayout_4->addLayout(horizontalLayout_6);

        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setSpacing(10);
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        label_5 = new QLabel(bigwidger);
        label_5->setObjectName(QStringLiteral("label_5"));
        sizePolicy.setHeightForWidth(label_5->sizePolicy().hasHeightForWidth());
        label_5->setSizePolicy(sizePolicy);
        label_5->setMinimumSize(QSize(200, 0));
        label_5->setMaximumSize(QSize(200, 45));

        horizontalLayout_8->addWidget(label_5);

        Hours = new QComboBox(bigwidger);
        Hours->setObjectName(QStringLiteral("Hours"));
        Hours->setMinimumSize(QSize(100, 70));
        Hours->setMaximumSize(QSize(70, 16777215));
        Hours->setEditable(false);
        Hours->setMaxVisibleItems(16);

        horizontalLayout_8->addWidget(Hours);

        label_8 = new QLabel(bigwidger);
        label_8->setObjectName(QStringLiteral("label_8"));
        label_8->setMinimumSize(QSize(8, 0));
        label_8->setMaximumSize(QSize(8, 16777215));

        horizontalLayout_8->addWidget(label_8);

        Minutes = new QComboBox(bigwidger);
        Minutes->setObjectName(QStringLiteral("Minutes"));
        Minutes->setMinimumSize(QSize(100, 70));
        Minutes->setMaximumSize(QSize(70, 16777215));
        Minutes->setEditable(false);

        horizontalLayout_8->addWidget(Minutes);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_8->addItem(horizontalSpacer_2);

        Add = new QPushButton(bigwidger);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(100, 70));

        horizontalLayout_8->addWidget(Add);

        Edit = new QPushButton(bigwidger);
        Edit->setObjectName(QStringLiteral("Edit"));
        Edit->setMinimumSize(QSize(100, 70));

        horizontalLayout_8->addWidget(Edit);

        Delete = new QPushButton(bigwidger);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMinimumSize(QSize(100, 70));

        horizontalLayout_8->addWidget(Delete);


        verticalLayout_4->addLayout(horizontalLayout_8);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        horizontalLayout_7->setSizeConstraint(QLayout::SetDefaultConstraint);

        verticalLayout_4->addLayout(horizontalLayout_7);


        gridLayout_2->addLayout(verticalLayout_4, 1, 0, 1, 1);

        Sections = new QTableWidget(bigwidger);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->setMinimumSize(QSize(500, 0));
        Sections->setEditTriggers(QAbstractItemView::NoEditTriggers);
        Sections->setAlternatingRowColors(true);
        Sections->setGridStyle(Qt::SolidLine);
        Sections->verticalHeader()->setMinimumSectionSize(30);

        gridLayout_2->addWidget(Sections, 2, 0, 1, 1);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalLayout_10 = new QHBoxLayout();
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        label_2 = new QLabel(bigwidger);
        label_2->setObjectName(QStringLiteral("label_2"));

        horizontalLayout_10->addWidget(label_2);

        timeLeft = new QLabel(bigwidger);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_10->addWidget(timeLeft);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_10->addItem(horizontalSpacer_4);

        label_7 = new QLabel(bigwidger);
        label_7->setObjectName(QStringLiteral("label_7"));

        horizontalLayout_10->addWidget(label_7);

        timeWeek = new QLabel(bigwidger);
        timeWeek->setObjectName(QStringLiteral("timeWeek"));

        horizontalLayout_10->addWidget(timeWeek);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_10->addItem(horizontalSpacer_3);

        error = new QLabel(bigwidger);
        error->setObjectName(QStringLiteral("error"));

        horizontalLayout_10->addWidget(error);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_10->addItem(horizontalSpacer);


        horizontalLayout_2->addLayout(horizontalLayout_10);

        label_6 = new QLabel(bigwidger);
        label_6->setObjectName(QStringLiteral("label_6"));
        sizePolicy.setHeightForWidth(label_6->sizePolicy().hasHeightForWidth());
        label_6->setSizePolicy(sizePolicy);
        label_6->setMinimumSize(QSize(50, 0));

        horizontalLayout_2->addWidget(label_6);

        Lunch = new QComboBox(bigwidger);
        Lunch->setObjectName(QStringLiteral("Lunch"));
        Lunch->setMinimumSize(QSize(140, 70));
        Lunch->setMaximumSize(QSize(100, 16777215));
        Lunch->setEditable(false);

        horizontalLayout_2->addWidget(Lunch);

        FinishedButton = new QPushButton(bigwidger);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));
        FinishedButton->setMinimumSize(QSize(100, 70));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(bigwidger);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 70));

        horizontalLayout_2->addWidget(CancelButton);


        gridLayout_2->addLayout(horizontalLayout_2, 3, 0, 1, 1);


        gridLayout->addWidget(bigwidger, 0, 0, 1, 1);

#ifndef QT_NO_SHORTCUT
        DescriptionLabel->setBuddy(Description);
#endif // QT_NO_SHORTCUT
        QWidget::setTabOrder(Projects, Items);
        QWidget::setTabOrder(Items, Description);
        QWidget::setTabOrder(Description, Hours);
        QWidget::setTabOrder(Hours, Minutes);
        QWidget::setTabOrder(Minutes, Add);
        QWidget::setTabOrder(Add, Edit);
        QWidget::setTabOrder(Edit, Delete);
        QWidget::setTabOrder(Delete, Lunch);
        QWidget::setTabOrder(Lunch, FinishedButton);
        QWidget::setTabOrder(FinishedButton, CancelButton);
        QWidget::setTabOrder(CancelButton, Sections);

        retranslateUi(ClockoutForm);

        QMetaObject::connectSlotsByName(ClockoutForm);
    } // setupUi

    void retranslateUi(QWidget *ClockoutForm)
    {
        ClockoutForm->setWindowTitle(QApplication::translate("ClockoutForm", "Clock Out Edit", Q_NULLPTR));
        label_3->setText(QApplication::translate("ClockoutForm", "Project:", Q_NULLPTR));
        label_4->setText(QApplication::translate("ClockoutForm", "Task:", Q_NULLPTR));
        DescriptionLabel->setText(QApplication::translate("ClockoutForm", "Note:", Q_NULLPTR));
        label_5->setText(QApplication::translate("ClockoutForm", "Time Worked:", Q_NULLPTR));
        Hours->setCurrentText(QString());
        label_8->setText(QApplication::translate("ClockoutForm", ":", Q_NULLPTR));
        Add->setText(QApplication::translate("ClockoutForm", "Add", Q_NULLPTR));
        Edit->setText(QApplication::translate("ClockoutForm", "Edit", Q_NULLPTR));
        Delete->setText(QApplication::translate("ClockoutForm", "Delete", Q_NULLPTR));
        label_2->setText(QApplication::translate("ClockoutForm", "Time Left: ", Q_NULLPTR));
        timeLeft->setText(QString());
        label_7->setText(QApplication::translate("ClockoutForm", "Week Total: ", Q_NULLPTR));
        timeWeek->setText(QString());
        error->setText(QString());
        label_6->setText(QApplication::translate("ClockoutForm", "Lunch Taken:", Q_NULLPTR));
        FinishedButton->setText(QApplication::translate("ClockoutForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ClockoutForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ClockoutForm: public Ui_ClockoutForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CLOCKOUTFORM_H
